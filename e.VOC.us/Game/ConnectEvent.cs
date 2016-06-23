using System;

namespace e.VOC.us.Game
{
    public delegate void ConnectEventHandler(object sender, ConnectEventArgs e);

    public class ConnectEventArgs : EventArgs
    {
        public string ConnectionId { get; set; }
        public string PlayerId { get; set; }
    }
}