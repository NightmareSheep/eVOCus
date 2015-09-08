using System;

namespace e.VOC.us.Game
{
    public static class Helper
    {
        public static Vector2D AngleToUnitVector(int angle)
        {
            return new Vector2D((float)Math.Cos(angle / (100 / Math.PI)),(float)Math.Sin(angle / (100 / Math.PI)));
        }
    }
}