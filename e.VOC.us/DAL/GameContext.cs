using System.Data.Entity;
using System.Data.Entity.ModelConfiguration.Conventions;
using e.VOC.us.Models;

namespace e.VOC.us.DAL
{
    public class GameContext : DbContext
    {
        public GameContext() : base("GameContext")
        {
        }

        public DbSet<Map> Maps { get; set; }
        public DbSet<StartLocation> StartLocations { get; set; } 
        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            modelBuilder.Conventions.Remove<PluralizingTableNameConvention>();
        }
    }
}