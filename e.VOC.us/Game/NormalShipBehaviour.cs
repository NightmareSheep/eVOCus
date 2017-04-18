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
            if (_ship.Player.Keyboard.IsKeyDown(37))
                _ship.Body.ApplyTorque(-_ship.TurnSpeed);
            if (_ship.Player.Keyboard.IsKeyDown(38))
                _ship.Speed += _ship.AccelSpeed;
            if (_ship.Player.Keyboard.IsKeyDown(39))
                _ship.Body.ApplyTorque(_ship.TurnSpeed);
            if (_ship.Player.Keyboard.IsKeyDown(40))
                _ship.Speed -= _ship.AccelSpeed;
            //_ship.Rectangle.Position.Add(Helper.AngleToUnitVector(_ship.Rectangle.Angle).Multiply(_ship.Speed));

            Vector2 currentForwardVector = _ship.Body.GetWorldVector(new Vector2(1, 0));
            float currentSpeed = Vector2.Dot(_ship.Body.LinearVelocity, currentForwardVector);
            float force = 0;
            if (_ship.Speed > currentSpeed)
                force = 10;
            else if (_ship.Speed < currentSpeed)
                force = -10;
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