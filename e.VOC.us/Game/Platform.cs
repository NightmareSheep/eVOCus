using System.Collections.Generic;

namespace e.VOC.us.Game
{
    public class Platform
    {
        private readonly RotatableRectangle _rectangle;
        public List<IHasRotatableRectangle> Children { get; set; } = new List<IHasRotatableRectangle>();
        private RotatableRectangle _previousState;


        public Platform(RotatableRectangle rectangle)
        {
            _rectangle = rectangle;
            _previousState = rectangle.Clone();
        }

        public void Update()
        {
            float xDifference = _rectangle.Position.X - _previousState.Position.X;
            float yDifference = _rectangle.Position.Y - _previousState.Position.Y;
            float angleDifference = _rectangle.Angle - _previousState.Angle;

            foreach (var child in Children)
            {
                if (child.Rectangle != null)
                {
                    child.Rectangle.Position.X += xDifference;
                    child.Rectangle.Position.Y += yDifference;
                    child.Rectangle.Angle += angleDifference;
                    var vector = new Vector2D(child.Rectangle.Position.X - _rectangle.Position.X, child.Rectangle.Position.Y - _rectangle.Position.Y).Rotate(Helper.DegreesToRadians(angleDifference));
                    child.Rectangle.Position = new Vector2D(_rectangle.Position.X + vector.X, _rectangle.Position.Y + vector.Y);
                }
            }
            _previousState = _rectangle.Clone();
        }
    }
}