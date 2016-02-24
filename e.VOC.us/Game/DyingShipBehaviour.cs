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
                _game.GameObjects.Add(new Spawner(_game, _ship.Player, _ship.Rectangle.Position, _ship.Rectangle.Angle));
                _game.GameObjects.Remove(_ship);
                
                /*
                Random random = new Random();
                _ship.Rectangle.Position.X = random.Next(_game.Map.Width);
                _ship.Rectangle.Position.Y = random.Next(_game.Map.Height);
                _ship.Speed = 1;
                _ship.Rectangle.Angle =
                    Helper.VectorToAngle(new Vector2D(_game.Map.Width/2f - _ship.Rectangle.Position.X,
                        _game.Map.Height/2f - _ship.Rectangle.Position.Y));
                _ship.BoatState = "spawning";
                _ship.ShipBehaviour = new SpawningShipBehaviour(_ship, Ship.SpawnTimer, _game);
                */
            }
        }
    }
}