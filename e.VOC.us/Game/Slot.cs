﻿namespace e.VOC.us.Game
{
    public class Slot
    {
        public int Team { get; set; }
        public LobbyPlayer LobbyPlayer { get; set; }

        public Slot(int team)
        {
            Team = team;
        }
    }
}