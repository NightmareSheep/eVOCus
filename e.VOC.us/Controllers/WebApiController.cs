using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using e.VOC.us.Game;

namespace e.VOC.us.Controllers
{
    public class WebApiController : ApiController
    {
        [HttpGet]
        public List<Lobby> Lobbies()
        {
            return Lobby.Lobbies.Select(x => x.Value).ToList();
        } 
    }
}
