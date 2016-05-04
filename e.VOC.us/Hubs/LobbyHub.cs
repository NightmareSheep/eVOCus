using System;
using System.Threading.Tasks;
using e.VOC.us.Game;
using Microsoft.AspNet.SignalR;

namespace e.VOC.us.Hubs
{
    public class LobbyHub : Hub
    {
        private const string LobbyPrefix = "lobby_";

        private Lobby GetLobby(string gameId)
        {
            Guid id = new Guid(gameId);
            Lobby lobby;
            Lobby.Lobbies.TryGetValue(id, out lobby);
            return lobby;
        }

        public void Join(string gameId, string playerId, string name)
        {
            var lobby = GetLobby(gameId);
            var joinSuccesfull = lobby?.Join(new LobbyPlayer(new Guid(playerId), Context.ConnectionId, name)) ?? false;
            if (joinSuccesfull)
            {
                Lobby.MemberShip.TryAdd(Context.ConnectionId, lobby.Id);
                Groups.Add(Context.ConnectionId, LobbyPrefix + gameId);
                Clients.OthersInGroup(LobbyPrefix + gameId).updateLobby(lobby.Slots);
            }
            Clients.Caller.joinCallback(joinSuccesfull, lobby?.Slots);
        }

        public void Switch(string gameId, int destination)
        {
            var lobby = GetLobby(gameId);
            var switchSuccesfull = lobby.Switch(Context.ConnectionId, destination);
            if (switchSuccesfull)
                Clients.Group(LobbyPrefix + gameId).updateLobby(lobby.Slots);
        }

        public override Task OnDisconnected(bool stopCalled)
        {
            Guid gameId;
            if (Lobby.MemberShip.TryRemove(Context.ConnectionId, out gameId))
            {
                Lobby lobby;
                Lobby.Lobbies.TryGetValue(gameId, out lobby);
                lobby?.Leave(Context.ConnectionId);
                Clients.Group(LobbyPrefix + gameId)?.updateLobby(lobby?.Slots);
            }
            return base.OnDisconnected(stopCalled);
        }
    }
}