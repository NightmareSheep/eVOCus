using System.Web.Script.Serialization;
using e.VOC.us.Game;
using Newtonsoft.Json;

namespace e.VOC.us.Models
{
    public class StartLocation
    {
        public int Id { get; set; }
        public int X { get; set; }
        public int Y { get; set; }
        public int Angle { get; set; }
        [JsonIgnore]
        [ScriptIgnore]
        public Map Map { get; set; }

        [ScriptIgnore]
        public Vector2D StartPosition => new Vector2D(X, Y);
    }
}