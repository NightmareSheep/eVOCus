using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Newtonsoft.Json;

namespace e.VOC.us.Game
{
    public class GameState
    {
        [JsonProperty("ship")]
        private Ship _ship;

        public GameState()
        {
            _ship = new Ship(new Vector2D(100,100), 45);
        }

        public void update()
        {
            _ship
        }
    }
}