using Newtonsoft.Json;

namespace e.VOC.us.Game
{
    public class Vector2D
    {
        [JsonProperty("x")]
        public int x;
        [JsonProperty("y")]
        public int y;

        public Vector2D(int x, int y)
        {
            this.x = x;
            this.y = y;
        }
    }
}