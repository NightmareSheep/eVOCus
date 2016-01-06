using System;
using Newtonsoft.Json;

namespace e.VOC.us.Game
{
    public class Ship
    {
        [JsonProperty("rectangle")] public readonly RotatableRectangle Rectangle;
        [JsonProperty("speed")] private float _speed = 1;
        [JsonProperty("boatState")] public string BoatState = "normal";
        [JsonProperty("cannons")] public Cannon[] Cannons;
        [JsonIgnore] public readonly Player Player;
        [JsonIgnore] private readonly GameState _game;
        [JsonIgnore] public IUpdatable ShipBehaviour;
        [JsonIgnore] private readonly Platform _platform;

        //Constants
        private const int MaxSpeed = 5;
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
            Cannons = new Cannon[1];
            Cannons[0] = new Cannon(new Vector2D(Rectangle.Position.X + 69, Rectangle.Position.Y), Rectangle.Angle);
            ShipBehaviour = new NormalShipBehaviour(this, _game);
            _platform = new Platform(Rectangle);
            _platform.Children.Add(Cannons[0]);
        }

        public void Update(GameTime gametime)
        {
            ShipBehaviour?.Update(gametime);
            _platform.Update();
            foreach (var cannon in Cannons)
                cannon.Update();
        }

        public void Fire()
        {
            _game.CannonBalls.Add(new Cannonball(new Vector2D(Rectangle.Position.X,Rectangle.Position.Y).Add(Helper.AngleToUnitVector(Rectangle.Angle).Multiply((float)Rectangle.Width/2 + 20)), Rectangle.Angle, _game, 2000, _speed + 5, Player));
        }

        public bool Hit(Vector2D position)
        {
            return BoatState == "normal" && Rectangle.Contains(position);
        }

        public void Damage(Player source = null)
        {
            if (source != null) source.Score++;
            BoatState = "dying";
            ShipBehaviour = new DyingShipBehaviour(this, DeathTimer, _game);
        }
    }
}