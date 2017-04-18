using System;
using System.Collections.Concurrent;
using System.Collections.Generic;
using System.Diagnostics;
using System.Threading;
using e.VOC.us.Hubs;
using Microsoft.AspNet.SignalR;

namespace e.VOC.us.Game
{
    public class Game
    {
        public readonly IHubContext HubContext;
        public readonly GameState GameState;
        public ConcurrentQueue<IInput> Input = new ConcurrentQueue<IInput>();
        private const int MaxMilisecondsWithoutInput = 6000000;
        private readonly object _myLock = new object();
        private const int Timestep = 64;
        private readonly Guid _id;

        public Game(Models.Map map, List<Slot> slots, Guid id)
        {
            HubContext = GlobalHost.ConnectionManager.GetHubContext<GameHub>();
            GameState = new GameState(map, slots);
            _id = id;
            var gameLoopThread = new Thread(GameLoop) { IsBackground = true };
            gameLoopThread.Start();
        }

        private void GameLoop()
        {
            var gametime = new GameTime();
            long lastInput = 0;
            //long last = 0;
            while (true)
            {
                gametime.Update();
                if (!Input.IsEmpty)
                    lastInput = gametime.ElapsedMilliseconds;

                ProcesInput();
                GameState.Update(gametime);
                HubContext.Clients.Group(GameHub.GamePrefix + _id).sync(GameState);
                if (gametime.ElapsedMilliseconds - lastInput > MaxMilisecondsWithoutInput)
                {
                    lock (_myLock)
                    {
                        if (Input.IsEmpty)
                        {
                            Game game;
                            GameHub.Games.TryRemove(_id, out game);
                            return;
                        }
                    }
                }

                if (gametime.ElapsedMillisecondsSinceLastUpdateGameloop < Timestep - 10)
                    Thread.Sleep(Math.Max(0, (Timestep - 10) - (int)gametime.ElapsedMillisecondsSinceLastUpdateGameloop));
                while (gametime.ElapsedMillisecondsSinceLastUpdateGameloop < Timestep) { }
                //Debug.WriteLine("difference " + (last - gametime.ElapsedMilliseconds));
                //Debug.WriteLine("gametime timestep " + gametime.ElapsedMillisecondsSinceLastUpdateGameloop);
                //last = gametime.ElapsedMilliseconds;
                Debug.WriteLine(gametime.ElapsedMilliseconds);
            }

        }

        private void ProcesInput()
        {
            while (!Input.IsEmpty)
            {
                IInput input;
                Input.TryDequeue(out input);
                input?.ProcesInput(GameState);
            }
        }
    }
}