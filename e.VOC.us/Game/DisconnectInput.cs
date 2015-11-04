namespace e.VOC.us.Game
{
    public class DisconnectInput : IInput
    {
        private readonly string _connectionId;

        public DisconnectInput(string connectionId)
        {
            _connectionId = connectionId;
        }

        public void ProcesInput(GameState gameState)
        {
            if (gameState.PlayerDictionary.ContainsKey(_connectionId))
            {
                var player = gameState.PlayerDictionary[_connectionId];
                gameState.PlayerDictionary.Remove(_connectionId);
                gameState.Players.Remove(player);
            }
        }
    }
}