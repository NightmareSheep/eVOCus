using System;
using Newtonsoft.Json;

namespace e.VOC.us.Game
{
    public class Vector2D
    {
        [JsonProperty("x")]
        public float x;
        [JsonProperty("y")]
        public float y;

        public Vector2D(float x, float y)
        {
            this.x = x;
            this.y = y;
        }

        public Vector2D Add(Vector2D vector)
        {
            x += vector.x;
            y += vector.y;
            return this;
        }

        public Vector2D Multiply(float i)
        {
            x *= i;
            y *= i;
            return this;
        }

        public Vector2D Rotate(Vector2D v, float angle)
        {
            return new Vector2D((float)( x * Math.Cos(angle) + y * -Math.Sin(angle)),(float)(x * Math.Sin(angle) + y * Math.Cos(angle)));
        }
    }
}