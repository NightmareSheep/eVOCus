using System.Collections.Concurrent;
using System.Diagnostics;
using System.Threading;
using System.Threading.Tasks;
using e.VOC.us.Game;
using Microsoft.AspNet.SignalR;

namespace e.VOC.us.Hubs
{
    public class Broadcaster
    {
        private readonly IHubContext _hubContext;
        private readonly GameState _game = new GameState();
        public ConcurrentQueue<IInput> Input = new ConcurrentQueue<IInput>();
        private volatile bool _stop;

        public Broadcaster()
        {
            _hubContext = GlobalHost.ConnectionManager.GetHubContext<GameHub>();
            var gameLoopThread = new Thread(GameLoop) {IsBackground = true};
            gameLoopThread.Start();
        }

        private void GameLoop()
        {
            var stopwatch = new Stopwatch();
            stopwatch.Start();

            while (true)
            {
                var currentTime = stopwatch.ElapsedMilliseconds;

                ProcesInput();
                _game.Update();
                _hubContext.Clients.All.sync(_game);

                if (_stop)
                    return;

                var elapsedTime = stopwatch.ElapsedMilliseconds - currentTime;

                if (elapsedTime < 40)
                    Thread.Sleep(40 - (int)elapsedTime);
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

        public void Dispose()
        {
            _stop = true;
        }
    }


    public class GameHub : Hub
    {
        private static Broadcaster _game;
        private static readonly object ThisLock = new object();
        private static int _numberOfClients;

        public GameHub() { 
            lock (ThisLock)
            {
                if (_game == null)
                    _game = new Broadcaster();
            }
        }

        public override Task OnConnected()
        {
            lock (ThisLock)
            {
                _numberOfClients++;
            }

            _game.Input.Enqueue(new ConnectInput(Context.ConnectionId));
            return base.OnConnected();
        }

        public override Task OnDisconnected(bool stopCalled)
        {
            _game.Input.Enqueue(new DisconnectInput(Context.ConnectionId));

            lock (ThisLock)
            {
                _numberOfClients--;
                if (_numberOfClients == 0)
                {
                    _game.Dispose();
                    _game = null;
                }
            }
            return base.OnDisconnected(stopCalled);
        }

    }
}