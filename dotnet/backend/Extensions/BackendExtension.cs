using Microsoft.AspNetCore.Cors.Infrastructure;
using Microsoft.EntityFrameworkCore;
using MyApp.Backend.Context;

namespace MyApp.Backend.Extension
{
    /// <summary>
    ///     Backend szolgáltatások regisztrációjáért felelős bővítő metódusok.
    ///     CORS és adatbázis-választási lehetőségek (InMemory, SQLite, MySQL).
    /// </summary>
    public static class BackendExtension
    {
        /// <summary>
        /// CORS = Cross-Origin Resource Sharing, vagyis „Különböző források közötti erőforrás-megosztás”.
        /// Szabályrendszer amely meghatározza ki férhet hozzá az API-hoz
        /// </summary>
        public const string CorsPolicyName = "MyAppCors";

        /// <summary>
        /// Egy webhely azonosítója: három részből áll – protokoll, domain(vagy host), port.
        /// </summary>
        private static readonly string[] DefaultCorsOrigins =
        {
            "https://localhost:7020",
            "http://localhost:5020"
        };

        /// <summary>
        ///     Backend szolgáltatások hozzáadása. 
        ///     <list type="bullet">
        ///         <item><description>InMemory – alapértelmezett, fejlesztéshez</description></item>
        ///         <item><description>SQLite – helyi fájl alapú adatbázis</description></item>
        ///         <item><description>MySQL – szerver alapú adatbázis</description></item>
        ///     </list>
        /// </summary>
        public static IServiceCollection AddBackend(this IServiceCollection services)
        {
            // CORS beállítás
            services.AddCors(options => ConfigureCors(options));

            // Adatbázis választás
            ConfigureInMemoryDb(services); // <- Alapértelmezett
            //ConfigureSqliteDb(services);
            //ConfigureMysqlDb(services);

            return services;
        }

        /// <summary>
        ///     CORS beállítása a „beégetett” origin listából.
        /// </summary>
        private static void ConfigureCors(CorsOptions options)
        {
            var origins = DefaultCorsOrigins
               .Select(o => o.Trim().TrimEnd('/'))
               .Distinct()
               .ToArray();

            options.AddPolicy(CorsPolicyName, policy =>
                policy.WithOrigins(origins)
                .AllowAnyHeader()
                .AllowAnyMethod());
        }

        /// <summary>
        ///     InMemory adatbázis regisztrációja fix névvel.
        ///     Oktatáshoz ideális: stabil név, az adatok nem tűnnek el újraindításkor.
        /// </summary>
        private static void ConfigureInMemoryDb(IServiceCollection services)
        {
            const string dbName = "MyApp_InMemory";
            services.AddDbContext<AppInMemoryDbContext>(options =>
                options.UseInMemoryDatabase(dbName));
        }

        /// <summary>
        ///     SQLite adatbázis regisztrációja. 
        ///     A fájl az alkalmazás könyvtárában jön létre.
        /// </summary>
        private static void ConfigureSqliteDb(IServiceCollection services)
        {
            // A fájl neve és elérési útja szabadon módosítható.
            var dbPath = Path.Combine(Environment.CurrentDirectory, "MyApp.db");
            services.AddDbContext<AppSqliteDbContext>(options =>
                options.UseSqlite($"Data Source={dbPath}"));
        }

        /// <summary>
        ///     MySQL adatbázis regisztrációja. 
        ///     A kapcsolat beállításai (server, user, password, database) itt adhatók meg.
        /// </summary>
        private static void ConfigureMysqlDb(IServiceCollection services)
        {
            // A connection string oktatási példa; éles környezetben soha ne így tároljuk!
            const string connectionString =
                "Server=localhost;Database=myapp_db;User=root;Password=;";

            services.AddDbContext<AppDbContext, AppMySqlDbContext>(options =>
                options.UseMySql(connectionString, ServerVersion.AutoDetect(connectionString)));
        }
    }
}
