using System.Linq;
using Newtonsoft.Json;

namespace e.VOC.us.Game
{
    public class Cannonball
    {
        [JsonProperty("position")]
        private readonly Vector2D _position;
        [JsonIgnore]
        private readonly float _direction;
        [JsonIgnore]
        private const int Speed = 5;
        [JsonIgnore]
        private readonly GameState _game;

        public Cannonball(Vector2D position, float direction, GameState game)
        {
            _position = position;
            _direction = direction;
            _game = game;
        }

        public void Update()
        {
            _position.Add(Helper.AngleToUnitVector(_direction).Multiply(Speed));
            foreach (var player in _game.Players.Where(player => player.Ship.Hit(_position)))
            {
                player.Ship.Damage();
                _game.CannonBalls.Remove(this);
                _game.Explosions.Add(_position);
            }

            if (_position.x < 0 || _position.y < 0 || _position.x > 1000 || _position.y > 1000)
                _game.CannonBalls.Remove(this);
        }
    }
}