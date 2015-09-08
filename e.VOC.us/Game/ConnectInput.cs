namespace e.VOC.us.Game
{
    public class ConnectInput : IInput
    {
        private readonly string _connectionId;

        public ConnectInput(string connectionId)
        {
            _connectionId = connectionId;
        }

        public void ProcesInput(GameState gamestate)
        {
            var player = new Player();
            gamestate.PlayerDictionary.Add(_connectionId, player);
            gamestate.Players.Add(player);
        }
    }
}