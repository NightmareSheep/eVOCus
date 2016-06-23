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

        [JsonIgnore]
        public StartLocation StartLocation { get; set; }

        public Player(GameState game)
        {
            Keyboard = new Keyboard();
            game.GameObjects.Add(game.ShipFactory.Ship(ShipTypes.Frigate, new Vector2D(100, 100), 0, this, game));
        }

        public Player(StartLocation startLocation, string id, string name)
        {
            Keyboard = new Keyboard();
            StartLocation = startLocation;
            Id = id;
        }

        public void Update(GameTime gametime)
        {
            Keyboard.Update();
        }
    }
}