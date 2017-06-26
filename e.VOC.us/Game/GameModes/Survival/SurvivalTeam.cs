using System.Collections.Generic;
using System.Linq;

namespace e.VOC.us.Game.GameModes.Survival
{
    public class SurvivalTeam
    {
        public List<SurvivalPlayer> Players;
        public int Score;
        
        public SurvivalTeam(IEnumerable<Player> players)
        {
            Players = players.Select(player => new SurvivalPlayer(player)).ToList();
        }

        public bool AnyPlayersAlive => Players.Any(player => player.Alive);
    }
}