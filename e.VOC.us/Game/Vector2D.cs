using System;
using Newtonsoft.Json;

namespace e.VOC.us.Game
{
    public class Vector2D
    {
        [JsonProperty("x")]
        public float X;
        [JsonProperty("y")]
        public float Y;

        [JsonIgnore]
        public float Length => (float)Math.Sqrt(X * X + Y * Y);
        [JsonIgnore]
        public Vector2D UnitVector => new Vector2D(X / Length, Y / Length);

        public Vector2D(float x, float y)
        {
            X = x;
            Y = y;
        }

        public Vector2D Add(Vector2D vector)
        {
            X += vector.X;
            Y += vector.Y;
            return this;
        }

        public Vector2D Multiply(float i)
        {
            X *= i;
            Y *= i;
            return this;
        }

        public Vector2D Rotate(Vector2D v, float angle)
        {
            return new Vector2D((float)( X * Math.Cos(angle) + Y * -Math.Sin(angle)),(float)(X * Math.Sin(angle) + Y * Math.Cos(angle)));
        }
    }
}