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

	    public bool Contains(Vector2D point)
	    {
	        var rotatedPosition = position.Rotate(position,-angle);
	        var rotatedPoint = point.Rotate(point, -angle);

	        return 
                rotatedPosition.x - width/2 < rotatedPoint.x &&
                rotatedPosition.x + width/2 > rotatedPoint.x &&
                rotatedPosition.y - height/2 < rotatedPoint.y &&
                rotatedPosition.y + height/2 > rotatedPoint.y;
	    }
	}
}