using System;
using System.Collections.Concurrent;
using System.Collections.Generic;
using System.Linq;

namespace e.VOC.us.Game
{
    public class Lobby
    {
        public static ConcurrentDictionary<Guid,Lobby> Lobbies { get; } = new ConcurrentDictionary<Guid, Lobby>();
        public static ConcurrentDictionary<string, Guid> MemberShip { get; } = new ConcurrentDictionary<string, Guid>();

        public string Name { get; set; }
        public Guid Id { get; set; } = Guid.NewGuid();
        public List<Slot> Slots { get; set; } = new List<Slot>();
        private readonly object _myLock = new object();
        private bool _disbanded;

        public Lobby(string name, List<Slot> slots)
        {
            Name = name;
            Slots = slots;
        }


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

        public bool Switch(string connectionId, int position, int destination)
        {
            lock (_myLock)
            {
                if (Slots.Count < position && Slots.Count < destination && Slots[position].LobbyPlayer.ConnectionId.Equals(connectionId) &&
                    Slots[destination].LobbyPlayer == null)
                {
                    Slots[destination].LobbyPlayer = Slots[position].LobbyPlayer;
                    Slots[position].LobbyPlayer = null;
                    return true;
                }
                return false;
            }
        }

    }
}