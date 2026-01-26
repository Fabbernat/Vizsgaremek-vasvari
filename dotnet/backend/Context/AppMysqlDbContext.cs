using Microsoft.EntityFrameworkCore;

namespace MyApp.Backend.Context
{
    /// <summary>
    ///     Az alkalmazás <b>MySQL adatbázis</b>-kontextusa, amely az 
    ///     <see cref="AppDbContext"/> alapbeállításait örökli, és 
    ///     MySQL-specifikus konfigurációkat tartalmaz.
    /// </summary>
    /// <remarks>
    ///     <para>
    ///         Ezt a kontextust akkor használjuk, amikor az alkalmazás
    ///         éles vagy felhő alapú környezetben MySQL szerverhez kapcsolódik.
    ///     </para>
    ///     <para>
    ///         Az <see cref="OnModelCreating(ModelBuilder)"/> metódusban először
    ///         meghívja az alap (AppDbContext) konfigurációkat, majd 
    ///         beállítja a MySQL karakterkészletet (<c>utf8mb4</c>) és
    ///         futtatja a <c>Seed()</c> metódust a tesztadatok inicializálására.
    ///     </para>
    ///     <para>
    ///         A <c>utf8mb4</c> karakterkészlet és a <c>utf8mb4_general_ci</c> 
    ///         kolláció használata biztosítja a nemzetközi karakterek (pl. ékezetek, emoji)
    ///         helyes tárolását és rendezését.
    ///     </para>
    /// </remarks>
    /// <example>
    ///     Tipikus regisztráció a <c>Program.cs</c> fájlban:
    ///     <code language="csharp">
    ///     builder.Services.AddDbContext<AppMysqlDbContext>(options =>
    ///         options.UseMySql(
    ///             builder.Configuration.GetConnectionString("MySqlConnection"),
    ///             ServerVersion.AutoDetect(builder.Configuration.GetConnectionString("MySqlConnection"))));
    ///     </code>
    /// </example>
    public sealed class AppMySqlDbContext : AppDbContext
    {
        public AppMySqlDbContext(DbContextOptions<AppMySqlDbContext> options)
            : base(options)
        {
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            // Alap konvenciók, konverziók, relációk betöltése az AppDbContext-ből
            base.OnModelCreating(modelBuilder);

            // MySQL-specifikus beállítások (karakterkódolás és collate)
            //MySql.EntityFrameworkCore.Extensions.MySQLModelBuilderExtensions.HasCharSet(modelBuilder, "utf8mb4");
            //MySql.EntityFrameworkCore.Extensions.MySQLModelBuilderExtensions.UseCollation(modelBuilder, "utf8mb4_general_ci");

            // Tesztadatok (seed) inicializálása
            modelBuilder.Seed();
        }
    }
}
