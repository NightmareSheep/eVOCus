using Newtonsoft.Json;

namespace e.VOC.us.Game
{
    public class Map
    {
        [JsonProperty("width")]
        public int Width;
        [JsonProperty("height")]
        public int Height;

        public Map(int width, int height)
        {
            Width = width;
            Height = height;
        }
    }
}