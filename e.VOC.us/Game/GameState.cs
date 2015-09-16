using System.Collections.Generic;
using Newtonsoft.Json;

namespace e.VOC.us.Game
{
    public class GameState
    {
        [JsonIgnore]
        public readonly Dictionary<string,Player> PlayerDictionary = new Dictionary<string, Player>();
        [JsonProperty("players")]
        public List<Player> Players = new List<Player>();

        public void Update()
        {
            foreach (var player in Players)
                player.Update();
        }

        public void AddPlayer(string id)
        {
            var player = new Player();
            Players.Add(player);
            PlayerDictionary.Add(id,player);
        }
    }
}