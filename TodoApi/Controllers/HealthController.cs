using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using System.Net;

namespace TodoAp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class HealthController : Controller
    {
        // GET api/health
        [HttpGet]
        public ActionResult<string> Get() => "ok";


        // GET api/health/ip
        [Route("ip")]
        [HttpGet]
        public JsonResult GetIp()
        {
            // @see https://stackoverflow.com/a/53119474
            var ips = System.Net.Dns.GetHostAddresses(System.Net.Dns.GetHostName());
            string[] result = ips.Select(ip => ip.ToString()).ToArray();
            return Json(result);
        }

    }
}
