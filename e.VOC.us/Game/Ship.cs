using System;
using System.Text;
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
        [JsonProperty("boatState")]
        private string _boatState = "normal";
        [JsonIgnore]
        private int _timer;

        public Ship(Vector2D position, int angle, Player player, GameState game)
        {
            Rectangle = new RotatableRectangle(position, 180,110, angle);
            _player = player;
            _game = game;
        }

        public void Update(GameTime gametime)
        {
            switch (_boatState)
            {
                case "normal":
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
                    if (Rectangle.position.x <= 0 || Rectangle.position.x >= 1000 || Rectangle.position.y <= 0 || Rectangle.position.y >= 1000)
                        Damage();
                    break;
                case "dying":
                    _timer -= (int)gametime.ElapsedMillisecondsSinceLastUpdate;
                    if (_timer <= 0)
                    {
                        _timer = 3000;
                        Random random = new Random();
                        Rectangle.position.x = random.Next(1000);
                        Rectangle.position.y = random.Next(1000);
                        _boatState = "spawning";
                    }
                    break;
                case "spawning":
                    _timer -= (int)gametime.ElapsedMillisecondsSinceLastUpdate;
                    if (_timer <= 0)
                    {
                        _boatState = "normal";
                    }
                    break;
            }
        }

        private void Fire()
        {
            _game.CannonBalls.Add(new Cannonball(new Vector2D(Rectangle.position.x,Rectangle.position.y).Add(Helper.AngleToUnitVector(Rectangle.angle).Multiply((float)Rectangle.width/2 + 20)), Rectangle.angle, _game));
        }

        public bool Hit(Vector2D position)
        {
            return _boatState == "normal" && Rectangle.Contains(position);
        }

        public void Damage()
        {
            _boatState = "dying";
            _timer = 1000;
        }
    }
}