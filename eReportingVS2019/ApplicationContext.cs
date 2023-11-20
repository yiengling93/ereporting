using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace eReportingVS2019
{
    public class ApplicationContext : Microsoft.EntityFrameworkCore.DbContext
    {
        public ApplicationContext(DbContextOptions<ApplicationContext> options)
            : base(options)
        {
        }

        public ApplicationContext() : base()
        {
        }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            //optionsBuilder.UseSqlServer(@"Data Source=(localdb)/MSSQLLocalDB/eReporting;");
            optionsBuilder.UseSqlServer("Server=DESKTOP-S13MIGF;Database=eReporting;Trusted_Connection=True;MultipleActiveResultSets=true");
        }
    }
}
