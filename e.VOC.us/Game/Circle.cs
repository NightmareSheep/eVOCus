using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using FarseerPhysics;
using FarseerPhysics.Dynamics;
using FarseerPhysics.Factories;
using Microsoft.Xna.Framework;
using Newtonsoft.Json;

namespace e.VOC.us.Game
{
    public class Circle : GameObject
    {
        [JsonIgnore]
        public readonly Body Body;
        [JsonProperty("position")]
        private readonly Vector2D _position;

        public Circle(World world, float x, float y)
        {
            this._position = new Vector2D(x,y);
            TypeId = "circle";
            Body = BodyFactory.CreateCircle(world, ConvertUnits.ToSimUnits(90f), 1, new Vector2(ConvertUnits.ToSimUnits(x), ConvertUnits.ToSimUnits(y)));
            Body.BodyType = BodyType.Dynamic;
        }

        public override void Update(GameTime gametime)
        {
            _position.X = ConvertUnits.ToDisplayUnits(Body.Position.X);
            _position.Y = ConvertUnits.ToDisplayUnits(Body.Position.Y);
        }
    }
}