using System;
using System.Collections.Concurrent;
using System.Threading.Tasks;
using e.VOC.us.Game;
using Microsoft.AspNet.SignalR;

namespace e.VOC.us.Hubs
{
    public class GameHub : Hub
    {
        public const string GamePrefix = "game_";
        public static readonly ConcurrentDictionary<Guid, Game.Game> Games = new ConcurrentDictionary<Guid, Game.Game>();

        public void KeyboardInput(int key, string state, string gameId, string playerId)
        {
            Game.Game game;
            if (!string.IsNullOrEmpty(gameId) && Games.TryGetValue(new Guid(gameId), out game))
                game.Input.Enqueue(new KeyboardInput(key, playerId, state));
        }

        public override Task OnConnected()
        {
            var gameId = Context.QueryString["gameId"];
            var playerId = Context.QueryString["playerId"];
            Game.Game game;
            if (!string.IsNullOrEmpty(gameId) && Games.TryGetValue(new Guid(gameId), out game))
            {
                Groups.Add(Context.ConnectionId, GamePrefix + gameId);
                game.Input.Enqueue(new ConnectInput(Context.ConnectionId, playerId, game.HubContext));
            }
            return base.OnConnected();
        }

        public override Task OnDisconnected(bool stopCalled)
        {
            return base.OnDisconnected(stopCalled);
        }
    }
}