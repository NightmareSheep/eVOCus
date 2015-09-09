using System;

namespace e.VOC.us.Game
{
    public static class Helper
    {
        public static Vector2D AngleToUnitVector(int angle)
        {
            return new Vector2D((float)Math.Cos(angle / (180 / Math.PI)),(float)Math.Sin(angle / (180 / Math.PI)));
        }
    }
}