using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace e.VOC.us.Game
{
    public class SpawningShipBehaviour : IUpdatable
    {
        private readonly Ship _ship;
        private int _spawnTimer;

        public SpawningShipBehaviour(Ship ship, int spawnTimer)
        {
            _ship = ship;
            _spawnTimer = spawnTimer;
        }

        public void Update(GameTime gametime)
        {
            _spawnTimer -= (int)gametime.ElapsedMillisecondsSinceLastUpdate;
            if (_spawnTimer <= 0)
            {
                _ship.BoatState = "normal";
                _ship.ShipBehaviour = new NormalShipBehaviour(_ship);
            }
        }
    }
}