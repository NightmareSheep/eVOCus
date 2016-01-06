using Newtonsoft.Json;

namespace e.VOC.us.Game
{
    public class Cannon : IHasRotatableRectangle
    {
        [JsonProperty("rectangle")]
        public  RotatableRectangle Rectangle { get; set; }

        public Cannon(Vector2D position, float angle)
        {
            Rectangle = new RotatableRectangle(position, 38, 20, angle);
        }

        public void Update()
        {
            
        }
    }
}