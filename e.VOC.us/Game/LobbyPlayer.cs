using System;
using Newtonsoft.Json;

namespace e.VOC.us.Game
{
    public class LobbyPlayer
    {
        [JsonIgnore]
        public Guid Id { get; set; }
        [JsonIgnore]
        public string ConnectionId { get; set; }
        public string Name { get; set; }
        public bool Ready { get; set; }

        public LobbyPlayer(Guid id, string connectionId, string name)
        {
            Id = id;
            ConnectionId = connectionId;
            Name = name;
        }
    }
}