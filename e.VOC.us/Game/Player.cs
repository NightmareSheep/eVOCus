using System;
using Newtonsoft.Json;

namespace e.VOC.us.Game
{
    public class Player
    {
        [JsonIgnore]
        private GameState _game;
        [JsonProperty("ship")]
        public readonly Ship Ship;
        [JsonIgnore]
        public Keyboard Keyboard { get; set; }
        [JsonProperty("id")]
        public readonly string Id = Guid.NewGuid().ToString();

        public Player(GameState game)
        {
            this._game = game;
            Keyboard = new Keyboard();
            Ship = new Ship(new Vector2D(100,100), 0, this, _game);
        }

        public void Update()
        {
            Ship.Update();
            Keyboard.Update();
        }
    }
}