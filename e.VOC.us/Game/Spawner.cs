using Newtonsoft.Json;

namespace e.VOC.us.Game
{
    public class Spawner : GameObject
    {
        [JsonIgnore] private readonly GameState _game;
        [JsonIgnore] private readonly Player _player;
        [JsonProperty("shipType")] private ShipTypes _shipType = ShipTypes.Frigate;
        // ReSharper disable once NotAccessedField.Local
        [JsonProperty("playerId")] private string _playerId;
        [JsonProperty("rectangle")] private readonly RotatableRectangle _rectangle;

        public Spawner(GameState game, Player player, Vector2D position, float angle)
        {
            _game = game;
            _player = player;
            _rectangle = new RotatableRectangle(position, 180, 110, angle);
            _playerId = player.Id;
            TypeId = "spawner";
            player.PlayerDisconnect += () => { game.GameObjects.Remove(this); };
        }

        public override void Update(GameTime gametime)
        {
            if (_player.Keyboard.IsKeyDown(37))
                _rectangle.Position.X-= 4;
            if (_player.Keyboard.IsKeyDown(38))
                _rectangle.Position.Y-= 4;
            if (_player.Keyboard.IsKeyDown(39))
                _rectangle.Position.X+= 4;
            if (_player.Keyboard.IsKeyDown(40))
                _rectangle.Position.Y += 4;
            if (_player.Keyboard.IsKeyDown(32))
                _rectangle.Angle+= 4;
            if (_player.Keyboard.IsKeyPressed(18))
                _shipType++;
            if (_player.Keyboard.IsKeyPressed(13))
            {
                _game.GameObjects.Add(_game.ShipFactory.Ship(_shipType, _rectangle.Position, _rectangle.Angle, _player, _game));
                _game.GameObjects.Remove(this);
            }
        }
    }
}