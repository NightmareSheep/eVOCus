using Newtonsoft.Json;

namespace e.VOC.us.Game.GameObjects
{
    public class FakeShip : GameObject
    {
        [JsonProperty("rectangle")]
        public RotatableRectangle Rectangle { get; set; }

        [JsonProperty("playerId")]
        public string PlayerId { get; set; }

        public FakeShip(RotatableRectangle rectangle, Player owner)
        {
            Rectangle = rectangle;
            PlayerId = owner.Id;
            TypeId = "fakeShip";
        }

        public override void Update(GameTime gametime)
        {
            
        }
    }
}