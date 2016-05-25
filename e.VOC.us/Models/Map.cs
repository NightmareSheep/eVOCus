using System.Collections.Generic;

namespace e.VOC.us.Models
{
    public class Map
    {
        public string Name { get; set; }
        public int Width { get; set; }
        public int Height { get; set; }
        public ICollection<StartLocation> StartLocations { get; set; }
        public string Thumbnail { get; set; }
    }
}