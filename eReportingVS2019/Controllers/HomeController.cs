using eReportingVS2019.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;

namespace eReportingVS2019.Controllers
{
    public class HomeController : Controller
    {
        private readonly ILogger<HomeController> _logger;
        private readonly ApplicationContext _db;

        public HomeController(ILogger<HomeController> logger)
        {
            _logger = logger;
            _db = new ApplicationContext();
        }

        public IActionResult Index()
        {
            return View();
        }

        public IActionResult Register()
        {
            return View();
        }

        public IActionResult ReportPolis()
        {
            return View();
        }

        public IActionResult PrintReport()
        {
            return View();
        }

        public IActionResult Privacy()
        {
            return View();
        }

        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }

        [AllowAnonymous]
        [Route("/HomeController/insertUser")]
        [HttpPost]
        public JsonResult insertUser(UserInfo userinfo)
        {
            var sql = @$"INSERT INTO user_info(userid, username, gender, address, telno) VALUES
                    ('{userinfo.userid}','{userinfo.username}', '{userinfo.gender}', '{userinfo.address}', '{userinfo.telno}')";

            try
            {
                _db.Database.ExecuteSqlRaw(sql);
            }
            catch (Exception ex)
            {
                return Json(new { success = false });
            }

            return Json(new { success = true });
        }

        [AllowAnonymous]
        [Route("/HomeController/retrieveUser")]
        [HttpGet]
        public JsonResult retrieveUser(string userid)
        {
            var sql = @$"SELECT * FROM user_info WHERE userid = '{userid}'";

            using (var command = _db.Database.GetDbConnection().CreateCommand())
            {
                command.CommandText = sql;
                command.CommandType = CommandType.Text;
                //command.Parameters.Add(new SqlParameter("supi", SqlDbType.VarChar));
                //command.Parameters[0].Value = spui;
                _db.Database.OpenConnection();

                using (var result = command.ExecuteReader())
                {
                    var entities = new List<UserInfo>();

                    while (result.Read())
                    {
                        var a = new UserInfo()
                        {
                            userid = result[0] == null ? "" : result[0].ToString(),
                            username = result[1] == null ? "" : result[1].ToString(),
                            gender = result[2] == null ? "" : result[2].ToString(),
                            address = result[3] == null ? "" : result[3].ToString(),
                            telno = result[4] == null ? "" : result[4].ToString(),
                        };
                        entities.Add(a);
                    }

                    _db.Database.CloseConnection();

                    return Json(new { success = true, data = entities.FirstOrDefault() });
                }
            }


            return Json(new { success = false, data = "" });
        }
    }
}
