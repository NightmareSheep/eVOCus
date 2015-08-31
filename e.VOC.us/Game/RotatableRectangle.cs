using Newtonsoft.Json;

namespace e.VOC.us.Game
{
	public class RotatableRectangle
	{
        [JsonProperty("position")]
	    public Vector2D position;
        [JsonProperty("width")]
	    public int width;
        [JsonProperty("height")]
	    public int height;
        [JsonProperty("angle")]
	    public int angle;

	    public RotatableRectangle(Vector2D position, int width, int height, int angle)
	    {
	        this.position = position;
	        this.width = width;
	        this.height = height;
	        this.angle = angle;
	    }
	}
}