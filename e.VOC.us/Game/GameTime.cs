using System.Diagnostics;

namespace e.VOC.us.Game
{
    public class GameTime
    {
        private readonly Stopwatch _stopwatch = new Stopwatch();
        private long _lastUpdate;

        public long ElapsedMilliseconds => _stopwatch?.ElapsedMilliseconds ?? 0;
        public long ElapsedMillisecondsSinceLastUpdate => ElapsedMilliseconds - _lastUpdate;

        public GameTime()
        {
            _stopwatch.Start();
        }

        public void Update()
        {
            _lastUpdate = ElapsedMilliseconds;
        }
    }
}