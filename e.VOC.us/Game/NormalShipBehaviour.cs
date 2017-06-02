using System;
using Microsoft.Xna.Framework;

namespace e.VOC.us.Game
{
    public class NormalShipBehaviour : IUpdatable
    {
        private readonly Ship _ship;
        private readonly GameState _game;

        public NormalShipBehaviour(Ship ship, GameState game)
        {
            _ship = ship;
            _game = game;
        }

        public void Update(GameTime gametime)
        {
            if (_ship.Player.Keyboard.IsKeyDown(37) && _ship.Body.AngularVelocity > -_ship.TurnSpeed * 20)
                _ship.Body.ApplyTorque(-_ship.TurnSpeed);
            if (_ship.Player.Keyboard.IsKeyDown(38))
                _ship.Speed += _ship.AccelSpeed;
            if (_ship.Player.Keyboard.IsKeyDown(39) && _ship.Body.AngularVelocity < _ship.TurnSpeed * 20)
                _ship.Body.ApplyTorque(_ship.TurnSpeed);
            if (_ship.Player.Keyboard.IsKeyDown(40))
                _ship.Speed -= _ship.AccelSpeed;
            //_ship.Rectangle.Position.Add(Helper.AngleToUnitVector(_ship.Rectangle.Angle).Multiply(_ship.Speed));

            // Kill lateral velocity
            Vector2 currentRightNormal = _ship.Body.GetWorldVector(new Vector2(0, 1));
            Vector2 lateralVelocity = Vector2.Dot(currentRightNormal, _ship.Body.LinearVelocity) * currentRightNormal;

            // Update friction
            Vector2 impulse = _ship.Body.Mass * -lateralVelocity;
            _ship.Body.ApplyLinearImpulse(impulse);

            Vector2 currentForwardVector = _ship.Body.GetWorldVector(new Vector2(1, 0));
            float currentSpeed = Vector2.Dot(currentForwardVector, _ship.Body.LinearVelocity);
            float force = 0;
            force = Math.Min(Math.Max(_ship.Speed - currentSpeed, -5), 5);
            _ship.Body.ApplyForce(force * currentForwardVector);

            //_ship.Body.ApplyForce(new Vector2(1,0));

            if (_ship.Rectangle.Position.X < 0)
                _ship.Rectangle.Position.X = _game.Map.Width;
            if (_ship.Rectangle.Position.X > _game.Map.Width)
                _ship.Rectangle.Position.X = 0;
            if (_ship.Rectangle.Position.Y < 0)
                _ship.Rectangle.Position.Y = _game.Map.Height;
            if (_ship.Rectangle.Position.Y > _game.Map.Height)
                _ship.Rectangle.Position.Y = 0;
        }
    }
}