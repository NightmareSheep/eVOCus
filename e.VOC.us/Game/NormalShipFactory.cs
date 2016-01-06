namespace e.VOC.us.Game
{
    public class NormalShipFactory : IShipFactory
    {
        public Ship Ship(ShipTypes shipType, Vector2D position, int angle, Player player, GameState game)
        {
            switch (shipType)
            {
                case ShipTypes.Frigate:
                    return null;
            }
            
            return null;
        }
    }
}