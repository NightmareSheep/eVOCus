using Newtonsoft.Json;

namespace e.VOC.us.Game
{
    public class Cannon
    {

        [JsonIgnore]
        private readonly Ship _ship;
        [JsonIgnore]
        private readonly Vector2D _position;
        [JsonIgnore]
        private readonly float _angle;
        [JsonProperty("rectangle")]
        private readonly RotatableRectangle _rectangle;

        public Cannon(Ship ship, Vector2D position, float angle)
        {
            _ship = ship;
            _position = position;
            _angle = angle;
            _rectangle = new RotatableRectangle(new Vector2D(_ship.Rectangle.Position.X + position.X, _ship.Rectangle.Position.Y + position.Y), 10, 100, angle + ship.Rectangle.Angle);
        }

        public void Update()
        {
            var rotatedPosition = new Vector2D(_position.X,_position.Y).Rotate(_ship.Rectangle.Angle);

            _rectangle.Position.X = _ship.Rectangle.Position.X + rotatedPosition.X;
            _rectangle.Position.Y = _ship.Rectangle.Position.Y + rotatedPosition.Y;
            _rectangle.Angle = _angle + _ship.Rectangle.Angle;
        }
    }
}