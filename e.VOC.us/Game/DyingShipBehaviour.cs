using System;

namespace e.VOC.us.Game
{
    public class DyingShipBehaviour : IUpdatable
    {
        private readonly Ship _ship;
        private int _deathTimer;
        private readonly GameState _game;
        private readonly Action _deathRattle;

        public DyingShipBehaviour(Ship ship, int deathTimer, GameState game, Action deathRattle)
        {
            _ship = ship;
            _deathTimer = deathTimer;
            _game = game;
            _deathRattle = deathRattle;
        }

        public void Update(GameTime gametime)
        {
            _deathTimer -= (int)gametime.ElapsedMillisecondsSinceLastUpdate;
            if (_deathTimer <= 0)
            {
                _game.GameObjects.Remove(_ship);
                _deathRattle?.Invoke();
            }
        }
    }
}