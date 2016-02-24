using System;
using Newtonsoft.Json;

namespace e.VOC.us.Game
{
    public class Cannon : IHasRotatableRectangle
    {
        private readonly Ship _ship;
        private readonly GameState _game;
        private const float ReloadTime = 1000;
        private float _reloadTimer;

        [JsonProperty("rectangle")] public  RotatableRectangle Rectangle { get; set; }

        public Cannon(Vector2D position, float angle, Ship ship, GameState game)
        {
            _ship = ship;
            _game = game;
            Rectangle = new RotatableRectangle(position, 38, 20, angle); 
        }

        public void Update(GameTime gametime)
        {
            _reloadTimer -= gametime.ElapsedMillisecondsSinceLastUpdate;
            _reloadTimer = Math.Max(0, _reloadTimer);

            if (_ship.Player.Keyboard.IsKeyPressed(32) && (int) Math.Ceiling(_reloadTimer) == 0)
            {
                _reloadTimer = ReloadTime;
                _game.CannonBalls.Add(
                    new Cannonball(
                        new Vector2D(Rectangle.Position.X, Rectangle.Position.Y).Add(
                            Helper.AngleToUnitVector(Rectangle.Angle).Multiply((float) Rectangle.Width/2 + 20)),
                        Rectangle.Angle, _game, 2000, _ship.Speed + 5, _ship.Player));
            }
        }
    }
}