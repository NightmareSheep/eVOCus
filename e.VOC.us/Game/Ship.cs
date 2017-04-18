using System;
using e.VOC.us.Game.DelegatesAndEventArgs;
using FarseerPhysics;
using FarseerPhysics.Dynamics;
using FarseerPhysics.Factories;
using Microsoft.Xna.Framework;
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
        [JsonIgnore] public Action DeathRattle { get; set; }
        [JsonIgnore] public readonly Body Body;

        public event ShipIsHitEventHandler IsHit;
        public const int DeathTimer = 2000;
        public const int SpawnTimer = 3000;

        protected virtual void OnIsHit(ShipIsHitEventArgs e)
        {
            IsHit?.Invoke(this, e);
        }

        public float Speed
        {
            get { return _speed; }
            set { _speed = Math.Max(0, Math.Min(MaxSpeed, value)); }
        }

        public Ship(ShipTypes shipType, RotatableRectangle rectangle, Cannon[] cannons, Player player, GameState game, float turnSpeed, float accelSpeed, float maxSpeed, Action deathRattle = null)
        {
            Body = BodyFactory.CreateRectangle(game.World, ConvertUnits.ToSimUnits(rectangle.Width), ConvertUnits.ToSimUnits(rectangle.Height), 1,
                new Vector2(ConvertUnits.ToSimUnits(rectangle.Position.X), ConvertUnits.ToSimUnits(rectangle.Position.Y)));
            Body.Rotation = Helper.DegreesToRadians(rectangle.Angle);
            Body.BodyType = BodyType.Dynamic;
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
            DeathRattle = deathRattle;
        }

        public override void Update(GameTime gametime)
        {
            Rectangle.Position.X = ConvertUnits.ToDisplayUnits(Body.Position.X);
            Rectangle.Position.Y = ConvertUnits.ToDisplayUnits(Body.Position.Y);
            Rectangle.Angle = Helper.RadiansToDegrees(Body.Rotation);

            ShipBehaviour?.Update(gametime);
            Platform.Update();
            foreach (var cannon in Cannons)
                cannon.Update(gametime);
        }

        public bool Hit(Vector2D position)
        {
            return BoatState == "normal" && Rectangle.Contains(position);
        }

        public void Damage(Player source = null)
        {
            OnIsHit(new ShipIsHitEventArgs(source));
            BoatState = "dying";
            ShipBehaviour = new DyingShipBehaviour(this, DeathTimer, _game, DeathRattle);
        }

        public void Dispose()
        {
            _game.World.RemoveBody(Body);
        }
    }
}