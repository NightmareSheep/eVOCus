using System;
using Newtonsoft.Json;

namespace e.VOC.us.Game.GameObjects
{
    public class CountDown : Message
    {
        [JsonIgnore]
        private readonly string _originalText;

        public CountDown(string text, long duration, Action deathRattle, GameState game) : base(text, duration, deathRattle, game)
        {
            _originalText = text;
        }

        public override void Update(GameTime gameTime)
        {
            Text = string.Format(_originalText, RemainingDuration/1000);
            base.Update(gameTime);
        }
    }
}