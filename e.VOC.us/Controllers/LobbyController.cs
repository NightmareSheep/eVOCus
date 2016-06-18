using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Routing;
using System.Web.Script.Serialization;
using e.VOC.us.DAL;
using e.VOC.us.Game;
using Microsoft.Ajax.Utilities;

namespace e.VOC.us.Controllers
{
    public class LobbyController : Controller
    {
        private GameContext Db = new GameContext();

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
            var maps = Db.Maps.ToList();
            return View(maps);
        }

        [HttpPost]
        public ActionResult Create(string name, string slots)
        {
            if (string.IsNullOrEmpty(name) || string.IsNullOrEmpty(slots))
                return RedirectToAction("Create");
            int[] teams = new JavaScriptSerializer().Deserialize<int[]>(slots);

            var lobby = new Lobby(name, new List<Slot> { new Slot(1), new Slot(1) , new Slot(1) , new Slot(2), new Slot(2), new Slot(2) });
            Lobby.Lobbies.TryAdd(lobby.Id, lobby);

            return RedirectToAction("Index", new RouteValueDictionary { {"id", lobby.Id} });
        }
    }
}