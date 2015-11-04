using Newtonsoft.Json;

namespace e.VOC.us.Game
{
	public class RotatableRectangle
	{
		[JsonProperty("position")]
		public Vector2D Position;
		[JsonProperty("width")]
		public int Width;
		[JsonProperty("height")]
		public int Height;
		[JsonProperty("angle")]
		public float Angle;

		public RotatableRectangle(Vector2D position, int width, int height, float angle)
		{
			Position = position;
			Width = width;
			Height = height;
			Angle = angle;
		}

		public bool Contains(Vector2D point)
		{
			var rotatedPosition = Position.Rotate(Position,-Angle);
			var rotatedPoint = point.Rotate(point, -Angle);

			return
				rotatedPosition.x - Width/2f < rotatedPoint.x &&
				rotatedPosition.x + Width/2f > rotatedPoint.x &&
				rotatedPosition.y - Height/2f < rotatedPoint.y &&
				rotatedPosition.y + Height/2f > rotatedPoint.y;
		}
	}
}