using System;
using System.Collections.Concurrent;
using System.Collections.Generic;
using System.Linq;

namespace e.VOC.us.Game
{
    public class Lobby
    {
        public static ConcurrentDictionary<Guid,Lobby> Lobbies { get; set; } = new ConcurrentDictionary<Guid, Lobby>();

        public string Name { get; set; }
        public Guid Id { get; set; } = Guid.NewGuid();
        public List<Slot> Slots { get; set; } = new List<Slot>();
        private readonly object _myLock = new object();
        private bool _disbanded;

        public bool Join(LobbyPlayer lobbyPlayer)
        {
            lock (_myLock)
            {
                if (_disbanded)
                    return false;

                foreach (var slot in Slots)
                {
                    if (slot.LobbyPlayer == null)
                    {
                        slot.LobbyPlayer = lobbyPlayer;
                        return true;
                    }
                }
            }
            return false;
        }

        public void Leave(string connectionId)
        {
            lock (_myLock)
            {
                Slots.First(slot => slot.LobbyPlayer.ConnectionId == connectionId).LobbyPlayer = null;
                if (Slots.All(slot => slot.LobbyPlayer == null))
                {
                    _disbanded = true;
                    Lobby lobby;
                    Lobbies.TryRemove(Id, out lobby);
                }
            }
        }

        public bool Switch(LobbyPlayer lobbyPlayer, int position, int destination)
        {
            lock (_myLock)
            {
                if (Slots.Count < position && Slots.Count < destination && Slots[position].LobbyPlayer.Id.Equals(lobbyPlayer.Id) &&
                    Slots[destination].LobbyPlayer == null)
                {
                    Slots[position].LobbyPlayer = null;
                    Slots[destination].LobbyPlayer = lobbyPlayer;
                    return true;
                }
                return false;
            }
        }

    }
}