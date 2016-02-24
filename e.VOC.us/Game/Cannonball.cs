using System.Linq;
using Newtonsoft.Json;

namespace e.VOC.us.Game
{
    public class Cannonball
    {
        [JsonProperty("position")] private readonly Vector2D _position;
        [JsonIgnore] private readonly float _direction;
        [JsonIgnore] private readonly GameState _game;
        [JsonIgnore] private int _lifetime;
        [JsonIgnore] private readonly float _speed;
        [JsonIgnore] private Player _owner;

        public Cannonball(Vector2D position, float direction, GameState game, int lifetime, float speed, Player owner = null)
        {
            _position = position;
            _direction = direction;
            _game = game;
            _lifetime = lifetime;
            _speed = speed;
            _owner = owner;
        }

        public void Update(GameTime gametime)
        {
            _position.Add(Helper.AngleToUnitVector(_direction).Multiply(_speed));
            _lifetime -= (int)gametime.ElapsedMillisecondsSinceLastUpdate;
            foreach (Ship ship in _game.GameObjects.Where(gameObject =>
            {
                var ship = gameObject as Ship;
                return ship != null && ship.Hit(_position);
            }))
            {
                ship.Damage(_owner);
                _game.CannonBalls.Remove(this);
                _game.Explosions.Add(_position);
            }

            if (_position.X < 0 || _position.Y < 0 || _position.X > _game.Map.Width || _position.Y > _game.Map.Height || _lifetime < 0)
                _game.CannonBalls.Remove(this);
        }
    }
}