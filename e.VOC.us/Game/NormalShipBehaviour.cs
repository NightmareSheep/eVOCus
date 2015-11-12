namespace e.VOC.us.Game
{
    public class NormalShipBehaviour : IUpdatable
    {
        private readonly Ship _ship;
        private const float TurnSpeed = 1.0f;
        private const float AccelSpeed = 0.1f;
        private const int mapWidth = 1000;
        private const int mapHeight = 1000;

        public NormalShipBehaviour(Ship ship)
        {
            _ship = ship;
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

            if (_ship.Rectangle.Position.x < 0)
                _ship.Rectangle.Position.x = mapWidth;
            if (_ship.Rectangle.Position.x > mapWidth)
                _ship.Rectangle.Position.x = 0;
            if (_ship.Rectangle.Position.y < 0)
                _ship.Rectangle.Position.y = mapHeight;
            if (_ship.Rectangle.Position.y > mapHeight)
                _ship.Rectangle.Position.y = 0;

            //|| _ship.Rectangle.Position.x >= 1000 || _ship.Rectangle.Position.y <= 0 || _ship.Rectangle.Position.y >= 1000)
            //_ship.Damage();
        }
    }
}