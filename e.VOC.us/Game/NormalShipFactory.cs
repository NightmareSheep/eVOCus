using System.Drawing;

namespace e.VOC.us.Game
{
    public class NormalShipFactory : IShipFactory
    {
        public Ship Ship(ShipTypes shipType, Vector2D position, int angle, Player player, GameState game)
        {
            switch (shipType)
            {
                case ShipTypes.Frigate:
                    var ship = new Ship(ShipTypes.Frigate, new RotatableRectangle(position, 180, 110, angle), new Cannon[1], player, game, 2.0f, 0.1f, 5f);
                    ship.Cannons[0] = new Cannon(new Vector2D(position.X + 69, position.Y), angle, ship, game);
                    ship.Platform.Children.Add(ship.Cannons[0]);
                    return ship;
            }
            
            return null;
        }
    }
}