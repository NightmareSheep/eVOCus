namespace e.VOC.us.Game
{
    public class Spawner : GameObject
    {
        private readonly GameState _game;
        private readonly Player _player;
        private readonly Vector2D _position;
        private ShipTypes _shipType = ShipTypes.Frigate;
        private int _angle;
        // ReSharper disable once NotAccessedField.Local
        private string _playerId;

        public Spawner(GameState game, Player player, Vector2D position)
        {
            _game = game;
            _player = player;
            _position = position;
            _playerId = player.Id;
            TypeId = "spawner";
        }

        public override void Update(GameTime gametime)
        {
            if (_player.Keyboard.IsKeyDown(37))
                _position.X--;
            if (_player.Keyboard.IsKeyDown(38))
                _position.Y--;
            if (_player.Keyboard.IsKeyDown(39))
                _position.X++;
            if (_player.Keyboard.IsKeyDown(40))
                _position.Y ++;
            if (_player.Keyboard.IsKeyDown(32))
                _angle++;
            if (_player.Keyboard.IsKeyPressed(18))
                _shipType++;
            if (_player.Keyboard.IsKeyPressed(13))
            {
                _player.Ship = _game.ShipFactory.Ship(_shipType, _position, _angle, _player, _game);
                _game.GameObjects.Remove(this);
            }
        }
    }
}