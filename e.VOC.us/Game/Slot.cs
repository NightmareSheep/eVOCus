using System.Drawing;

namespace e.VOC.us.Game
{
    public class Slot
    {
        public int Team { get; set; }
        public LobbyPlayer LobbyPlayer { get; set; }
        public Color Color { get; set; }

        public Slot(int team) : this(team, Color.Red)
        {
        }

        public Slot(int team, Color color)
        {
            Team = team;
            Color = color;
        }
    }
}