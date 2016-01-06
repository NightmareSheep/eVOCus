﻿namespace e.VOC.us.Game
{
    interface IShipFactory
    {
        Ship Ship(ShipTypes shipType, Vector2D position, int angle, Player player, GameState game);
    }
}
