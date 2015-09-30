using System.Threading.Tasks;
using e.VOC.us.Game;
using Microsoft.AspNet.SignalR;

namespace e.VOC.us.Hubs
{
    public class GameHub : Hub
    {
        private static readonly Game.Game Game = new Game.Game();

        public void KeyboardInput(int key, string state)
        {
            Game.Input.Enqueue(new KeyboardInput(key, Context.ConnectionId, state));
        }

        public void NameInput(string name)
        {
            Game.Input.Enqueue(new NameInput(Context.ConnectionId, name));
        }

        public override Task OnConnected()
        {
            Game.Connect(Context.ConnectionId);
            return base.OnConnected();
        }

        public override Task OnDisconnected(bool stopCalled)
        {
            Game.Input.Enqueue(new DisconnectInput(Context.ConnectionId));
            return base.OnDisconnected(stopCalled);
        }
    }
}