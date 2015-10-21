using System.Collections.Concurrent;
using System.Threading;
using e.VOC.us.Hubs;
using Microsoft.AspNet.SignalR;

namespace e.VOC.us.Game
{
    public class Game
    {
        private readonly IHubContext _hubContext;
        private readonly GameState _game = new GameState();
        public ConcurrentQueue<IInput> Input = new ConcurrentQueue<IInput>();
        private const int MaxMilisecondsWithoutInput = 60000;
        private readonly object _myLock = new object();
        private bool _hasStopped = true;

        public Game()
        {
            _hubContext = GlobalHost.ConnectionManager.GetHubContext<GameHub>();
        }

        private void GameLoop()
        {
            var gametime = new GameTime();
            long lastInput = 0;

            while (true)
            {
                if (gametime.ElapsedMillisecondsSinceLastUpdate < 40)
                    Thread.Sleep(40 - (int)gametime.ElapsedMillisecondsSinceLastUpdate);

                gametime.Update();
                if (!Input.IsEmpty)
                    lastInput = gametime.ElapsedMilliseconds;

                ProcesInput();
                _game.Update(gametime);
                _hubContext.Clients.All.sync(_game);

                if (gametime.ElapsedMilliseconds - lastInput > MaxMilisecondsWithoutInput)
                {
                    lock (_myLock)
                    {
                        if (Input.IsEmpty)
                        {
                            _hasStopped = true;
                            return;
                        }
                    }
                }
            }

        }

        /// <summary>
        /// Connects the player to the game.
        /// Checks if the game is still running, restarts the game if it is not.
        /// </summary>
        /// <param name="id">Id of the player</param>
        public void Connect(string id)
        {
            lock (_myLock)
            {
                Input.Enqueue(new ConnectInput(id, _hubContext));

                // If game is still running do nothing
                if (!_hasStopped) return;

                // Else restart the game
                _hasStopped = false;
                var gameLoopThread = new Thread(GameLoop) { IsBackground = true };
                gameLoopThread.Start();
            }
        }

        private void ProcesInput()
        {
            while (!Input.IsEmpty)
            {
                IInput input;
                Input.TryDequeue(out input);
                input.ProcesInput(_game);
            }
        }
    }
}