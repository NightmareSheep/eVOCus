using System.Collections.Generic;
using Newtonsoft.Json;

namespace e.VOC.us.Models
{
    public class Map
    {
        public Map()
        {
            // ReSharper disable once DoNotCallOverridableMethodsInConstructor
            StartLocations = new List<StartLocation>();
        }

        [JsonIgnore]
        public string Name { get; set; }
        [JsonProperty("width")]
        public int Width { get; set; }
        [JsonProperty("height")]
        public int Height { get; set; }
        [JsonIgnore]
        public virtual ICollection<StartLocation> StartLocations { get; set; }
        [JsonIgnore]
        public string Thumbnail { get; set; }
        [JsonIgnore]
        public int Id { get; set; }
    }
}