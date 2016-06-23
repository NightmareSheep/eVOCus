using System.Collections.Generic;
using e.VOC.us.Models;

namespace e.VOC.us.DAL
{
    public class GameInitializer : System.Data.Entity.DropCreateDatabaseAlways<GameContext>
    {
        protected override void Seed(GameContext context)
        {
            var startLocations = new List<StartLocation>
            {
                new StartLocation
                {
                    X = 100,
                    Y = 100,
                    Angle = 0
                },
                new StartLocation
                {
                    X = 900,
                    Y = 100,
                    Angle = 180
                },
                new StartLocation
                {
                    X = 900,
                    Y = 900,
                    Angle = 0
                },
                new StartLocation
                {
                    X = 100,
                    Y = 900,
                    Angle = 180
                }
            };
            startLocations.ForEach(startLocation => context.StartLocations.Add(startLocation));
            context.SaveChanges();

            var maps = new List<Map>
            {
                new Map
                {
                    Name = "First map",
                    Height = 1000,
                    Width = 1000,
                    Thumbnail = "",
                    StartLocations = startLocations
                }
            };
            maps.ForEach(map => context.Maps.Add(map));
            context.SaveChanges();

            var startLocations2 = new List<StartLocation>
            {
                new StartLocation
                {
                    X = 100,
                    Y = 100,
                    Angle = 0
                },
                new StartLocation
                {
                    X = 900,
                    Y = 100,
                    Angle = 270
                },
                new StartLocation
                {
                    X = 900,
                    Y = 900,
                    Angle = 270
                },
                new StartLocation
                {
                    X = 100,
                    Y = 900,
                    Angle = 90
                },
                new StartLocation
                {
                    X = 900,
                    Y = 900,
                    Angle = 270
                },
                new StartLocation
                {
                    X = 100,
                    Y = 900,
                    Angle = 90
                }
            };
            startLocations2.ForEach(startLocation => context.StartLocations.Add(startLocation));
            context.SaveChanges();

            var maps2 = new List<Map>
            {
                new Map
                {
                    Name = "Second map",
                    Height = 1000,
                    Width = 1000,
                    Thumbnail = "",
                    StartLocations = startLocations2
                }
            };
            maps2.ForEach(map => context.Maps.Add(map));
            context.SaveChanges();
        }
    }
}