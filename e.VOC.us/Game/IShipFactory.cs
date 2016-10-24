using System;
using e.VOC.us.Game.GameObjects;

namespace e.VOC.us.Game
{
    public interface IShipFactory
    {
        Ship Ship(ShipTypes shipType, Vector2D position, float angle, Player player, GameState game);
        FakeShip FakeShip(ShipTypes shipType, Vector2D position, float angle, Player player, GameState game);
    }
}
