using Microsoft.AspNet.SignalR;

namespace e.VOC.us.Game
{
    public class ConnectInput : IInput
    {
        private readonly string _connectionId;
        private readonly IHubContext _hubContext;

        public ConnectInput(string connectionId, IHubContext hubContext)
        {
            _connectionId = connectionId;
            _hubContext = hubContext;
        }

        public void ProcesInput(GameState gamestate)
        {
            var player = new Player(gamestate);
            gamestate.PlayerDictionary.Add(_connectionId, player);
            gamestate.Players.Add(player);

            // Try catch because client could have disconnected
            try
            {
                _hubContext.Clients.Client(_connectionId).Start(player.Id, gamestate.GameTime);
            }
            catch
            {
                // ignored
            }
        }
    }
}