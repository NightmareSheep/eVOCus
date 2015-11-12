using System;

namespace e.VOC.us.Game
{
    public class DyingShipBehaviour : IUpdatable
    {
        private readonly Ship _ship;
        private int _deathTimer;
        private readonly GameState _game;

        public DyingShipBehaviour(Ship ship, int deathTimer, GameState game)
        {
            _ship = ship;
            _deathTimer = deathTimer;
            _game = game;
        }

        public void Update(GameTime gametime)
        {
            _deathTimer -= (int)gametime.ElapsedMillisecondsSinceLastUpdate;
            if (_deathTimer <= 0)
            {
                Random random = new Random();
                _ship.Rectangle.Position.X = random.Next(1000);
                _ship.Rectangle.Position.Y = random.Next(1000);
                _ship.Speed = 1;
                _ship.BoatState = "spawning";
                _ship.ShipBehaviour = new SpawningShipBehaviour(_ship, Ship.SpawnTimer, _game);
            }
        }
    }
}