namespace e.VOC.us.Game
{
    public interface IShipFactory
    {
        Ship Ship(ShipTypes shipType, Vector2D position, float angle, Player player, GameState game);
    }
}
