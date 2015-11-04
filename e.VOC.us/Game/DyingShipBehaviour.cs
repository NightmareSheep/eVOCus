using System;

namespace e.VOC.us.Game
{
    public class DyingShipBehaviour : IUpdatable
    {
        private readonly Ship _ship;
        private int _deathTimer;

        public DyingShipBehaviour(Ship ship, int deathTimer)
        {
            _ship = ship;
            _deathTimer = deathTimer;
        }

        public void Update(GameTime gametime)
        {
            _deathTimer -= (int)gametime.ElapsedMillisecondsSinceLastUpdate;
            if (_deathTimer <= 0)
            {
                Random random = new Random();
                _ship.Rectangle.Position.x = random.Next(1000);
                _ship.Rectangle.Position.y = random.Next(1000);
                _ship.BoatState = "spawning";
                _ship.ShipBehaviour = new SpawningShipBehaviour(_ship, Ship.SpawnTimer);
            }
        }
    }
}