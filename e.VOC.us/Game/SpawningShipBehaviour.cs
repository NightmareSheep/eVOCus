namespace e.VOC.us.Game
{
    public class SpawningShipBehaviour : IUpdatable
    {
        private readonly Ship _ship;
        private int _spawnTimer;
        private readonly GameState _game;

        public SpawningShipBehaviour(Ship ship, int spawnTimer, GameState game)
        {
            _ship = ship;
            _spawnTimer = spawnTimer;
            _game = game;
        }

        public void Update(GameTime gametime)
        {
            _spawnTimer -= (int)gametime.ElapsedMillisecondsSinceLastUpdate;
            if (_spawnTimer <= 0)
            {
                _ship.BoatState = "normal";
                _ship.ShipBehaviour = new NormalShipBehaviour(_ship, _game);
            }
        }
    }
}