using System;

namespace e.VOC.us.Game
{
    public static class Helper
    {
        public static Vector2D AngleToUnitVector(float angle)
        {
            return new Vector2D((float)Math.Cos(angle / (180 / Math.PI)),(float)Math.Sin(angle / (180 / Math.PI)));
        }

        public static float VectorToAngle(Vector2D vector)
        {
            return (float)(Math.Tanh(vector.Y/ vector.X) * (180f / Math.PI));
        }

        public static float DegreesToRadians(float degrees)
        {
            return (float)(Math.PI/180f) *degrees;
        }
    }
}