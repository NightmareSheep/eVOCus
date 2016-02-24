using System;
using Newtonsoft.Json;

namespace e.VOC.us.Game
{
    public class Player
    {
        [JsonIgnore]
        public Keyboard Keyboard { get; set; }
        [JsonProperty("id")]
        public readonly string Id = Guid.NewGuid().ToString();

        [JsonProperty("name")]
        public string Name;

        [JsonProperty("score")]
        public int Score;

        public event Action PlayerDisconnect;

        public void Disconnect()
        {
            PlayerDisconnect?.Invoke();
        }

        public Player(GameState game)
        {
            Keyboard = new Keyboard();
            game.GameObjects.Add(game.ShipFactory.Ship(ShipTypes.Frigate, new Vector2D(100, 100), 0, this, game));
        }

        public void Update(GameTime gametime)
        {
            Keyboard.Update();
        }
    }
}