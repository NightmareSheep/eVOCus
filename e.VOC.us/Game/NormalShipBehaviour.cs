namespace e.VOC.us.Game
{
    public class NormalShipBehaviour : IUpdatable
    {
        private readonly Ship _ship;
        private readonly GameState _game;
        private const float TurnSpeed = 1.0f;
        private const float AccelSpeed = 0.1f;
        private const int mapWidth = 1600;
        private const int mapHeight = 1600;

        public NormalShipBehaviour(Ship ship, GameState game)
        {
            _ship = ship;
            _game = game;
        }

        public void Update(GameTime gametime)
        {
            if (_ship.Player.Keyboard.IsKeyDown(37))
                _ship.Rectangle.Angle -= TurnSpeed;
            if (_ship.Player.Keyboard.IsKeyDown(38))
                _ship.Speed += AccelSpeed;
            if (_ship.Player.Keyboard.IsKeyDown(39))
                _ship.Rectangle.Angle += TurnSpeed;
            if (_ship.Player.Keyboard.IsKeyDown(40))
                _ship.Speed -= AccelSpeed;
            if (_ship.Player.Keyboard.IsKeyPressed(32))
                _ship.Fire();
            _ship.Rectangle.Position.Add(Helper.AngleToUnitVector(_ship.Rectangle.Angle).Multiply(_ship.Speed));

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