using System;
using e.VOC.us.Models;
using Newtonsoft.Json;

namespace e.VOC.us.Game
{
    public class Player
    {
        [JsonIgnore]
        public Keyboard Keyboard { get; set; }
        [JsonProperty("id")]
        public string Id = Guid.NewGuid().ToString();

        [JsonProperty("name")]
        public string Name;

        [JsonProperty("score")]
        public int Score;

        [JsonProperty("team")] public int Team;

        [JsonIgnore]
        public StartLocation StartLocation { get; set; }

        public Player(GameState game)
        {
            Keyboard = new Keyboard();
        }

        public Player(StartLocation startLocation, string id, string name, int team)
        {
            Keyboard = new Keyboard();
            StartLocation = startLocation;
            Id = id;
            Name = name;
            Team = team;
        }

        public void Update(GameTime gametime)
        {
            Keyboard.Update();
        }
    }
}