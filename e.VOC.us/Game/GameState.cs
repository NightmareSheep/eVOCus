using System;
using System.Collections.Generic;
using System.Diagnostics;
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
        [JsonProperty("explosions")]
        public List<Vector2D> Explosions = new List<Vector2D>();
        [JsonIgnore]
        private readonly Random _random = new Random();

        private int explosionTimer = 1000;

        public void Update(GameTime gametime)
        {
            Explosions.Clear();
            explosionTimer -= (int)gametime.ElapsedMillisecondsSinceLastUpdate;
            if (explosionTimer < 0)
            {
                explosionTimer = 1000;
                Explosions.Add(new Vector2D(_random.Next(1000), _random.Next(1000)));
            }
            foreach (var player in Players)
                player.Update(gametime);

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