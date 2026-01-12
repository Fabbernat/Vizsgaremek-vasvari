using Microsoft.EntityFrameworkCore;

namespace MyApp.Backend.Context
{
    /// <summary>
    ///     Az alkalmazás <b>SQLite adatbázis</b>-kontextusa, amely az 
    ///     <see cref="AppDbContext"/> alapbeállításait örökli, és 
    ///     SQLite-specifikus használatra készült (lokális fejlesztéshez, könnyű telepítéshez).
    /// </summary>
    /// <remarks>
    ///     <para>
    ///         Elsősorban fejlesztői környezetben ajánlott. Az <see cref="OnModelCreating(ModelBuilder)"/>
    ///         metódusban először betölti az alap (AppDbContext) konfigurációkat, majd inicializálja
    ///         a tesztadatokat a <c>Seed()</c> hívással.
    ///     </para>
    ///     <para>
    ///         Megjegyzés: ha <c>DateOnly/TimeOnly</c> típusokat használtok, gondoskodjatok a konverziókról
    ///         (pl. központilag az AppDbContext-ben), hogy JSON-ban is megfelelően jelenjenek meg.
    ///     </para>
    /// </remarks>
    /// <example>
    ///     Tipikus regisztráció a <c>Program.cs</c>-ben:
    ///     <code language="csharp">
    ///     builder.Services.AddDbContext<AppSqliteDbContext>(options =>
    ///         options.UseSqlite(builder.Configuration.GetConnectionString("SqliteConnection")));
    ///     </code>
    /// </example>
    public sealed class AppSqliteDbContext : AppDbContext
    {
        public AppSqliteDbContext(DbContextOptions options)
            : base(options)
        {
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            // 1) Alap konvenciók és konfigurációk az AppDbContext-ből
            base.OnModelCreating(modelBuilder);

            // 2) (Opcionális) SQLite-specifikus beállítások, ha szükségesek lennének
            //    (pl. típus-konverziók, collations). Általában elég az alap konfig.

            // 3) Tesztadatok (seed) inicializálása
            modelBuilder.Seed();
        }
    }
}
