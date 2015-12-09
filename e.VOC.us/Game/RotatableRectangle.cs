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
			var rotatedPosition = Position.Rotate(-Angle);
			var rotatedPoint = point.Rotate(-Angle);

			return
				rotatedPosition.X - Width/2f < rotatedPoint.X &&
				rotatedPosition.X + Width/2f > rotatedPoint.X &&
				rotatedPosition.Y - Height/2f < rotatedPoint.Y &&
				rotatedPosition.Y + Height/2f > rotatedPoint.Y;
		}
	}
}