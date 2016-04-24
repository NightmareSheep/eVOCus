using System;

namespace e.VOC.us.Game
{
    public class LobbyPlayer
    {
        public Guid Id { get; set; }
        public string ConnectionId { get; set; }
        public string Name { get; set; }

        public LobbyPlayer(Guid id, string connectionId, string name)
        {
            Id = id;
            ConnectionId = connectionId;
            Name = name;
        }
    }
}