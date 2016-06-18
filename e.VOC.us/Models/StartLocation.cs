using System.Web.Script.Serialization;
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
    }
}