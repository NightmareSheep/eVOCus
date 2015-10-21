using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography.X509Certificates;
using System.Text;
using System.Threading.Tasks;

namespace e.VOC.us.Game
{
    public interface IUpdatable
    {
        void Update(GameTime gametime);
    }
}
