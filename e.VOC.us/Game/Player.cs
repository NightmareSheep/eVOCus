﻿using Newtonsoft.Json;

namespace e.VOC.us.Game
{
    public class Player
    {
        [JsonProperty("ship")]
        private readonly Ship _ship;
        [JsonIgnore]
        public Keyboard Keyboard { get; set; }

        public Player()
        {
            Keyboard = new Keyboard();
            _ship = new Ship(new Vector2D(100,100), 0, this);
        }

        public void Update()
        {
            _ship.Update();
            Keyboard.Update();
        }
    }
}