using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace e.VOC.us.Game
{
    public class NameInput : IInput
    {
        private readonly string _id;
        private readonly string _name;

        public NameInput(string id, string name)
        {
            _id = id;
            _name = name;
        }

        public void ProcesInput(GameState gameState)
        {
            gameState.PlayerDictionary[_id].Name = _name;
        }
    }
}