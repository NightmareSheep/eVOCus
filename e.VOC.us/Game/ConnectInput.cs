using Microsoft.AspNet.SignalR;

namespace e.VOC.us.Game
{
    public class ConnectInput : IInput
    {
        private readonly string _connectionId;
        private readonly string _playerId;
        private readonly IHubContext _hubContext;

        public ConnectInput(string connectionId, string playerId, IHubContext hubContext)
        {
            _connectionId = connectionId;
            _playerId = playerId;
            _hubContext = hubContext;
        }

        public void ProcesInput(GameState gamestate)
        {
            gamestate.PlayerConnect(_connectionId, _playerId);

            // Try catch because client could have disconnected
            try
            {
                _hubContext.Clients.Client(_connectionId).Start(gamestate.GameTime);
            }
            catch
            {
                // ignored
            }
        }
    }
}