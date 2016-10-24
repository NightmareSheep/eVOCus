namespace e.VOC.us.Game.DelegatesAndEventArgs
{
    public class ShipIsHitEventArgs
    {
        public Player Source { get; set; }

        public ShipIsHitEventArgs(Player source)
        {
            Source = source;
        }
    }
}