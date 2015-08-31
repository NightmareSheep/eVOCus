using System;
using System.Collections.Generic;
using System.Data.Entity.Migrations.Model;
using System.Linq;
using System.Web;
using Newtonsoft.Json;

namespace e.VOC.us.Game
{
    public class Ship
    {
        [JsonProperty("rectangle")]
        private RotatableRectangle rectangle;

        public Ship(Vector2D position, int angle)
        {
            this.rectangle = new RotatableRectangle(position, 360,120, angle);
        }

        public void Update()
        {
            rectangle.position.x++;
        }
    }
}