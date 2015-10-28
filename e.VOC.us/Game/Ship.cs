using System;
using Newtonsoft.Json;

namespace e.VOC.us.Game
{
    public class Ship
    {
        [JsonProperty("rectangle")]
        public readonly RotatableRectangle Rectangle;
        [JsonProperty("speed")]
        private float _speed = 1;
        [JsonIgnore]
        public readonly Player Player;
        [JsonIgnore]
        private readonly GameState _game;
        [JsonProperty("boatState")]
        public string BoatState = "normal";
        [JsonIgnore]
        public IUpdatable ShipBehaviour;

        //Constants
        private const int MaxSpeed = 1;
        public const int DeathTimer = 2000;
        public const int SpawnTimer = 3000;

        public float Speed
        {
            get { return _speed; }
            set { _speed = Math.Max(0, Math.Min(MaxSpeed, value)); }
        }

        public Ship(Vector2D position, int angle, Player player, GameState game)
        {
            Rectangle = new RotatableRectangle(position, 180,110, angle);
            Player = player;
            _game = game;
            ShipBehaviour = new NormalShipBehaviour(this);
        }

        public void Update(GameTime gametime)
        {
            ShipBehaviour?.Update(gametime);
        }

        public void Fire()
        {
            _game.CannonBalls.Add(new Cannonball(new Vector2D(Rectangle.Position.x,Rectangle.Position.y).Add(Helper.AngleToUnitVector(Rectangle.Angle).Multiply((float)Rectangle.Width/2 + 20)), Rectangle.Angle, _game));
        }

        public bool Hit(Vector2D position)
        {
            return BoatState == "normal" && Rectangle.Contains(position);
        }

        public void Damage()
        {
            BoatState = "dying";
            ShipBehaviour = new DyingShipBehaviour(this, DeathTimer);
        }
    }
}