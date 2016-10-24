using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace e.VOC.us.Controllers
{
    public class GameHostingController : Controller
    {
        // GET: GameHosting
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult HostedGamesList()
        {
            return View();
        }

        public ActionResult NewGame()
        {
            return View();
        }

        public ActionResult JoinGame()
        {
            return View();
        }
    }
}