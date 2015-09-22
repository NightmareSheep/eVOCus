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
        [JsonProperty("canonballs")]
        public List<Cannonball> CannonBalls = new List<Cannonball>();
        public List<Vector2D> Explosions = new List<Vector2D>(); 

        public void Update()
        {
            Explosions.Clear();
            foreach (var player in Players)
                player.Update();

            for (int i = CannonBalls.Count - 1; i >= 0; i--)
                CannonBalls[i].Update();
        }  

        public void AddPlayer(string id)
        {
            var player = new Player(this);
            Players.Add(player);
            PlayerDictionary.Add(id,player);
        }
    }
}