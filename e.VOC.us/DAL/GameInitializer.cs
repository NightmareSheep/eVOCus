using System.Collections.Generic;
using e.VOC.us.Models;

namespace e.VOC.us.DAL
{
    public class GameInitializer : System.Data.Entity.DropCreateDatabaseIfModelChanges<GameContext>
    {
        protected override void Seed(GameContext context)
        {
            var maps = new List<Map>
            {
                new Map
                {
                    Name = "First map",
                    Height = 1000,
                    Width = 1000,
                    Thumbnail = "",
                    StartLocations = new List<StartLocation>
                    {
                        new StartLocation
                        {
                            X = 100,
                            Y = 100,
                            Angle = 90
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
                    }
                }
            };

            maps.ForEach(map => context.Maps.Add(map));
            context.SaveChanges();
        }
    }
}