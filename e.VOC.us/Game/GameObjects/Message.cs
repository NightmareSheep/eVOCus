using System;
using Microsoft.Ajax.Utilities;
using Newtonsoft.Json;

namespace e.VOC.us.Game.GameObjects
{
    public class Message : GameObject
    {
        [JsonProperty("text")]
        public string Text { get; set; }
        [JsonIgnore]
        public long Duration { get; set; }
        [JsonIgnore]
        public long RemainingDuration { get; set; }
        [JsonIgnore]
        public Action DeathRattle { get; set; }

        [JsonIgnore] private readonly GameState _game;

        public Message(string text, long duration, Action deathRattle, GameState game)
        {
            Text = text;
            Duration = duration;
            DeathRattle = deathRattle;
            TypeId = "message";
            _game = game;
            RemainingDuration = duration;
        }

        public override void Update(GameTime gametime)
        {
            RemainingDuration -= gametime.ElapsedMillisecondsSinceLastUpdate;
            if (RemainingDuration < 0)
            {
                DeathRattle?.Invoke();
                _game.GameObjects.Remove(this);
            }
        }
    }
}