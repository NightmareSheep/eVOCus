using System;
using System.Collections.Generic;
using System.Drawing;
using System.Linq;
using System.Web;

namespace e.VOC.us.Game
{
    public class NormalShipBehaviour : IUpdatable
    {
        private readonly Ship _ship;

        public NormalShipBehaviour(Ship ship)
        {
            _ship = ship;
        }

        public void Update(GameTime gametime)
        {
            if (_ship.Player.Keyboard.IsKeyDown(37))
                _ship.Rectangle.angle--;
            if (_ship.Player.Keyboard.IsKeyDown(38))
                _ship.Speed++;
            if (_ship.Player.Keyboard.IsKeyDown(39))
                _ship.Rectangle.angle++;
            if (_ship.Player.Keyboard.IsKeyDown(40))
                _ship.Speed--;
            if (_ship.Player.Keyboard.IsKeyPressed(32))
                _ship.Fire();
            _ship.Rectangle.position.Add(Helper.AngleToUnitVector(_ship.Rectangle.angle).Multiply(_ship.Speed));
            if (_ship.Rectangle.position.x <= 0 || _ship.Rectangle.position.x >= 1000 || _ship.Rectangle.position.y <= 0 || _ship.Rectangle.position.y >= 1000)
                _ship.Damage();
        }
    }
}