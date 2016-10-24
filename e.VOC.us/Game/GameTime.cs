using System;
using System.Diagnostics;

namespace e.VOC.us.Game
{
    public class GameTime
    {
        private readonly Stopwatch _stopwatch = new Stopwatch();
        private long _currentUpdate;

        public long ElapsedMilliseconds => _stopwatch?.ElapsedMilliseconds ?? 0;
        public long ElapsedMillisecondsSinceLastUpdate => 64;
        public long ElapsedMillisecondsSinceLastUpdateGameloop => ElapsedMilliseconds - _currentUpdate;

        public GameTime()
        {
            _stopwatch.Start();
        }

        public void Update()
        {
            _currentUpdate = ElapsedMilliseconds;
        }
    }
}