using System;
using Newtonsoft.Json;

namespace e.VOC.us.Game
{
    public class Player
    {
        [JsonProperty("ship")]
        public readonly Ship Ship;
        [JsonIgnore]
        public Keyboard Keyboard { get; set; }
        [JsonProperty("id")]
        public readonly string Id = Guid.NewGuid().ToString();

        [JsonProperty("name")]
        public string Name;

        public Player(GameState game)
        {
            Keyboard = new Keyboard();
            Ship = new Ship(new Vector2D(100,100), 0, this, game);
        }

        public void Update(GameTime gametime)
        {
            Ship.Update(gametime);
            Keyboard.Update();
        }
    }
}