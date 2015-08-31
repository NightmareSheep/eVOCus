using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using System.Web;
using e.VOC.us.Game;
using Microsoft.AspNet.SignalR;

namespace e.VOC.us.Hubs
{
    public class Broadcaster
    {
        // We're going to broadcast to all clients a maximum of 25 times per second
        private readonly TimeSpan BroadcastInterval =
            TimeSpan.FromMilliseconds(40);
        private readonly IHubContext _hubContext;
        private Timer _broadcastLoop;
        private int counter;
        private GameState game = new GameState();
        public Broadcaster()
        {
            // Save our hub context so we can easily use it 
            // to send to its connected clients
            _hubContext = GlobalHost.ConnectionManager.GetHubContext<GameHub>();
            // Start the broadcast loop
            _broadcastLoop = new Timer(
                Broadcast,
                null,
                BroadcastInterval,
                BroadcastInterval);
        }
        public void Broadcast(object state)
        {
            counter++;
            _hubContext.Clients.All.updateCounter(counter);
            _hubContext.Clients.All.sync(new GameState());
        }

        public void Dispose()
        {
            _broadcastLoop.Dispose();
        }
    }


    public class GameHub : Hub
    {
        private static Broadcaster _game = null;
        private static object thisLock = new object();
        private static int numberOfClients;

        public GameHub() { 
            lock (thisLock)
            {
                if (_game == null)
                    _game = new Broadcaster();
            }
        }

        public override Task OnConnected()
        {
            lock (thisLock)
            {
                numberOfClients++;
            }
            
            return base.OnConnected();
        }

        public override Task OnDisconnected(bool stopCalled)
        {
            lock (thisLock)
            {
                numberOfClients--;
                if (numberOfClients == 0)
                {
                    _game.Dispose();
                    _game = null;
                }
            }
            return base.OnDisconnected(stopCalled);
        }

    }
}