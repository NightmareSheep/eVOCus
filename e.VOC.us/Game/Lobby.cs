using System;
using System.Collections.Concurrent;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using e.VOC.us.Hubs;
using Microsoft.AspNet.SignalR;
using WebGrease.Css.Extensions;

namespace e.VOC.us.Game
{
    public class Lobby
    {
        public static ConcurrentDictionary<Guid,Lobby> Lobbies { get; } = new ConcurrentDictionary<Guid, Lobby>();
        public static ConcurrentDictionary<string, Guid> MemberShip { get; } = new ConcurrentDictionary<string, Guid>();

        public string Name { get; set; }
        public Guid Id { get; set; } = Guid.NewGuid();
        public List<Slot> Slots { get; set; }
        private readonly object _myLock = new object();
        private bool _disbanded;
        private Guid _countDownId;
        private readonly IHubContext _lobbyHub;

        public void StateHasChanged()
        {
            StopCountdown();
            Slots.Where(slot => slot.LobbyPlayer != null).ForEach(slot => slot.LobbyPlayer.Ready = false);
        }

        public void StopCountdown() => _countDownId = Guid.Empty;

        public Lobby(string name, List<Slot> slots)
        {
            Name = name;
            Slots = slots;
            _lobbyHub = GlobalHost.ConnectionManager.GetHubContext<LobbyHub>();
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
                        StateHasChanged();
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
                var playerSlot = Slots.FirstOrDefault(slot => slot.LobbyPlayer?.ConnectionId == connectionId);
                if (playerSlot != null)
                {
                    playerSlot.LobbyPlayer = null;
                    StateHasChanged();
                }
                if (Slots.All(slot => slot.LobbyPlayer == null))
                {
                    _disbanded = true;
                    Lobby lobby;
                    Lobbies.TryRemove(Id, out lobby);
                }
            }
        }

        public bool Switch(string connectionId, int destination)
        {
            lock (_myLock)
            {
                var positionSlot = Slots.FirstOrDefault(slot => slot.LobbyPlayer?.ConnectionId?.Equals(connectionId) ?? false);

                if (positionSlot != null && destination < Slots.Count && Slots[destination].LobbyPlayer == null)
                {
                    Slots[destination].LobbyPlayer = positionSlot.LobbyPlayer;
                    positionSlot.LobbyPlayer = null;
                    StateHasChanged();
                    return true;
                }
                return false;
            }
        }

        public bool Ready(string connectionId, bool ready)
        {
            lock (_myLock)
            {
                var positionSlot = Slots.FirstOrDefault(slot => slot.LobbyPlayer?.ConnectionId?.Equals(connectionId) ?? false);
                if (positionSlot?.LobbyPlayer == null) return false;
                positionSlot.LobbyPlayer.Ready = ready;
                StopCountdown();
                if (Slots.All(slot => slot.LobbyPlayer == null || slot.LobbyPlayer.Ready) && Slots.Where(slot => slot.LobbyPlayer != null).Select(slot => slot.Team).Distinct().Count() > 1)
                    StartGame();
            }
            return true;
        }

        public void StartGame()
        {
            lock (_myLock)
            {
                var countDownId = Guid.NewGuid();
                _countDownId = countDownId;

                Task countDown = new Task(() =>
                {
                    for (int countdown = 5; countdown >= 0; countdown--)
                    {
                        lock (_myLock)
                        {
                            if (countDownId != _countDownId)
                            {
                                _lobbyHub.Clients.Group(LobbyHub.LobbyPrefix + Id).getMessage("Countdown stopped");
                                return;
                            }
                        }

                        if (countdown == 0)
                        {
                            // create game
                            _lobbyHub.Clients.Group(LobbyHub.LobbyPrefix + Id).getMessage("Game started");
                            _disbanded = true;
                            Lobby lobby;
                            Lobbies.TryRemove(Id, out lobby);
                            return;
                        }

                        _lobbyHub.Clients.Group(LobbyHub.LobbyPrefix + Id).getMessage("Countdown: " + countdown);
                        Thread.Sleep(1000);
                    }

                }
                );
                countDown.Start();
            }
        }

    }
}