﻿using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(e.VOC.us.Startup))]
namespace e.VOC.us
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
        }
    }
}
