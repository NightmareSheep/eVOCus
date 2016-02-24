using System;
using Newtonsoft.Json;

namespace e.VOC.us.Game
{
    public abstract class GameObject
    {
        [JsonProperty("typeId")]
        protected string TypeId = "gameObject";
        [JsonProperty("id")]
        // ReSharper disable once UnusedMember.Local
        private string _id = Guid.NewGuid().ToString();

        public abstract void Update(GameTime gametime);
    }
}