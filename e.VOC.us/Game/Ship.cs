using System;
using Newtonsoft.Json;

namespace e.VOC.us.Game
{
    public class Ship : GameObject
    {
        [JsonProperty("rectangle")] public readonly RotatableRectangle Rectangle;
        [JsonProperty("speed")] private float _speed = 1;
        [JsonProperty("boatState")] public string BoatState = "normal";
        [JsonProperty("cannons")] public Cannon[] Cannons;
        // ReSharper disable once NotAccessedField.Local
        [JsonProperty("playerId")] private string _playerId;
        [JsonIgnore] public readonly Player Player;
        [JsonIgnore] private readonly GameState _game;
        [JsonIgnore] public IUpdatable ShipBehaviour;
        [JsonIgnore] public readonly Platform Platform;
        [JsonIgnore] public ShipTypes ShipType { get; }

        [JsonIgnore] public float TurnSpeed { get; }
        [JsonIgnore] public float AccelSpeed { get; }
        //Constants
        [JsonIgnore] public float MaxSpeed { get; }
        public const int DeathTimer = 2000;
        public const int SpawnTimer = 3000;

        public float Speed
        {
            get { return _speed; }
            set { _speed = Math.Max(0, Math.Min(MaxSpeed, value)); }
        }

        public Ship(ShipTypes shipType, RotatableRectangle rectangle, Cannon[] cannons, Player player, GameState game, float turnSpeed, float accelSpeed, float maxSpeed)
        {
            TypeId = "ship";
            _playerId = player.Id;
            ShipType = shipType;
            Rectangle = rectangle;
            Player = player;
            _game = game;
            TurnSpeed = turnSpeed;
            AccelSpeed = accelSpeed;
            MaxSpeed = maxSpeed;
            Cannons = cannons;
            ShipBehaviour = new NormalShipBehaviour(this, _game);
            Platform = new Platform(Rectangle);
            player.PlayerDisconnect += () => { game.GameObjects.Remove(this); };
            
        }

        public override void Update(GameTime gametime)
        {
            ShipBehaviour?.Update(gametime);
            Platform.Update();
            foreach (var cannon in Cannons)
                cannon.Update(gametime);
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