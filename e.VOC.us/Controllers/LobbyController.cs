using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Routing;
using e.VOC.us.Game;

namespace e.VOC.us.Controllers
{
    public class LobbyController : Controller
    {
        public ActionResult Index(string id)
        {
            Lobby lobby;
            if (string.IsNullOrEmpty(id) || !Lobby.Lobbies.TryGetValue(new Guid(id), out lobby))
                return RedirectToAction("Index", "Home");

            return View(lobby);
        }

        public ActionResult List()
        {
            return View();
        }

        [HttpGet]
        public ActionResult Create()
        {
            return View();
        }

        [HttpPost]
        public ActionResult Create(string name)
        {
            if (string.IsNullOrEmpty(name))
                return RedirectToAction("Create");

            var lobby = new Lobby(name, new List<Slot> { new Slot(1), new Slot(1) , new Slot(1) , new Slot(2), new Slot(2), new Slot(2) });
            Lobby.Lobbies.TryAdd(lobby.Id, lobby);

            return RedirectToAction("Index", new RouteValueDictionary { {"id", lobby.Id} });
        }
    }
}