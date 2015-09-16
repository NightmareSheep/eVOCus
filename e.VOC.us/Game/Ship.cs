using Newtonsoft.Json;

namespace e.VOC.us.Game
{
    public class Ship
    {
        [JsonProperty("rectangle")]
        private readonly RotatableRectangle rectangle;
        [JsonProperty("speed")]
        private int _speed = 1;
        [JsonIgnore]
        private readonly Player _player;

        public Ship(Vector2D position, int angle, Player player)
        {
            rectangle = new RotatableRectangle(position, 360,120, angle);
            _player = player;
        }

        public void Update()
        {
            if (_player.Keyboard.IsKeyDown(37))
                rectangle.angle--;
            if (_player.Keyboard.IsKeyDown(38))
                _speed++;
            if (_player.Keyboard.IsKeyDown(39))
                rectangle.angle++;
            if (_player.Keyboard.IsKeyDown(40))
                _speed--;

            rectangle.position.Add(Helper.AngleToUnitVector(rectangle.angle).Multiply(_speed));
            if (rectangle.position.x < 0 || rectangle.position.y < 0 || rectangle.position.x > 1000 || rectangle.position.y > 1000)
                rectangle.position = new Vector2D(500,500);
        }
    }
}