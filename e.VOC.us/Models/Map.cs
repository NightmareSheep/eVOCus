using System.Collections.Generic;

namespace e.VOC.us.Models
{
    public class Map
    {
        public Map()
        {
            // ReSharper disable once DoNotCallOverridableMethodsInConstructor
            StartLocations = new List<StartLocation>();
        }

        public string Name { get; set; }
        public int Width { get; set; }
        public int Height { get; set; }
        public virtual ICollection<StartLocation> StartLocations { get; set; }
        public string Thumbnail { get; set; }

        public int Id { get; set; }
    }
}