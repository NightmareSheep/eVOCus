namespace e.VOC.us.Game.GameModes.Survival
{
    public class SurvivalPlayer
    {
        public Player Player { get; set; }
        public bool Alive { get; set; }
        public int Kills { get; set; }

        public SurvivalPlayer(Player player)
        {
            Player = player;
            Alive = true;
        }
    }
}