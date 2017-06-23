using System.Drawing;
using e.VOC.us.Game.GameObjects;

namespace e.VOC.us.Game
{
    public class NormalShipFactory : IShipFactory
    {
        public Ship Ship(ShipTypes shipType, Vector2D position, float angle, Player player, GameState game)
        {
            switch (shipType)
            {
                case ShipTypes.Frigate:
                    var ship = new Ship(ShipTypes.Frigate, new RotatableRectangle(position, 180, 110, angle), new Cannon[1], player, game, 0.5f, 2.0f, -0.1f, 1.5f);
                    var vector = new Vector2D(69,0);
                    vector = vector.Rotate(Helper.DegreesToRadians(angle));
                    ship.Cannons[0] = new Cannon(new Vector2D(position.X + vector.X, position.Y + vector.Y), angle, ship, game);
                    ship.Platform.Children.Add(ship.Cannons[0]);
                    return ship;
            }
            
            return null;
        }

        public FakeShip FakeShip(ShipTypes shipType, Vector2D position, float angle, Player player, GameState game)
        {
            switch (shipType)
            {
                case ShipTypes.Frigate:
                    return new FakeShip(new RotatableRectangle(position, 180, 110, angle), player);
            }

            return null;
        }
    }
}