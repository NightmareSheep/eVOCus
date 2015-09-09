namespace e.VOC.us.Game
{
    public class KeyboardInput : IInput
    {
        private readonly string _buttonState;
        private readonly string _id;
        private readonly int _key;

        public KeyboardInput(int key, string id, string buttonState)
        {
            _key = key;
            _id = id;
            _buttonState = buttonState;
        }

        public void ProcesInput(GameState gameState)
        {
            if (gameState.PlayerDictionary.ContainsKey(_id))
            {
                var keyboard = gameState.PlayerDictionary[_id].Keyboard;
                switch (_buttonState)
                {
                    case "down":
                        keyboard.KeysDown.Add(_key);
                        break;
                    case "up":
                        keyboard.KeysDown.Remove(_key);
                        keyboard.KeysPressed.Add(_key);
                        break;
                }
            }
        }
    }
}