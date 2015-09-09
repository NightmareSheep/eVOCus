using System.Collections.Generic;
using Newtonsoft.Json;

namespace e.VOC.us.Game
{
    public class Keyboard
    {
        public List<int> KeysDown = new List<int>();
        public  List<int> KeysPressed = new List<int>();

        public void Update()
        {
            KeysPressed.Clear();
        }

        public bool IsKeyDown(int key)
        {
            return KeysDown.Contains(key);
        }

        public bool IsKeyPressed(int key)
        {
            return KeysPressed.Contains(key);
        }
    }
}