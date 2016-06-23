namespace e.VOC.us.Game
{
    public class DisconnectInput : IInput
    {
        private readonly string _connectionId;
        private readonly string _playerId;

        public DisconnectInput(string connectionId, string playerId)
        {
            _connectionId = connectionId;
            _playerId = playerId;
        }

        public void ProcesInput(GameState gameState)
        {
            gameState.PlayerDisconnect(_connectionId, _playerId);
        }
    }
}