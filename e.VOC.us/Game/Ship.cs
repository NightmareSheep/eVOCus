using System;
using Newtonsoft.Json;

namespace e.VOC.us.Game
{
    public class Ship
    {
        [JsonProperty("rectangle")]
        public readonly RotatableRectangle Rectangle;
        [JsonProperty("speed")]
        private int _speed = 1;
        [JsonIgnore]
        private readonly Player _player;
        [JsonIgnore]
        private readonly GameState _game;

        public Ship(Vector2D position, int angle, Player player, GameState game)
        {
            Rectangle = new RotatableRectangle(position, 180,110, angle);
            _player = player;
            _game = game;
        }

        public void Update()
        {
            if (_player.Keyboard.IsKeyDown(37))
                Rectangle.angle--;
            if (_player.Keyboard.IsKeyDown(38))
                _speed++;
            if (_player.Keyboard.IsKeyDown(39))
                Rectangle.angle++;
            if (_player.Keyboard.IsKeyDown(40))
                _speed--;
            if (_player.Keyboard.IsKeyPressed(32))
                Fire();
            Rectangle.position.Add(Helper.AngleToUnitVector(Rectangle.angle).Multiply(_speed));

            Random random = new Random();
            if (Rectangle.position.x < 0 || Rectangle.position.y < 0 || Rectangle.position.x > 1000 || Rectangle.position.y > 1000)
                Rectangle.position = new Vector2D(random.Next(1000), random.Next(1000));
        }

        private void Fire()
        {
            _game.CannonBalls.Add(new Cannonball(new Vector2D(Rectangle.position.x,Rectangle.position.y).Add(Helper.AngleToUnitVector(Rectangle.angle).Multiply((float)Rectangle.width/2 + 20)), Rectangle.angle, _game));
        }

        public void Hit()
        {
            Random random = new Random();
            Rectangle.position = new Vector2D(random.Next(1000),random.Next(1000));
        }
    }
}