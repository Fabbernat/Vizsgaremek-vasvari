using Microsoft.EntityFrameworkCore;

namespace MyApp.Backend.Context
{
    /// <summary>
    ///     Az alkalmazás <b>memóriában futó (InMemory)</b> adatbázis-kontextusa,
    ///     amely az <see cref="AppDbContext"/> osztályból örökli az alapbeállításokat.
    /// </summary>
    /// <remarks>
    ///     <para>
    ///         Fejlesztési célokra készült, ahol nincs szükség tényleges
    ///         adatbázis-kiszolgálóra. Az adatok a program futása során a memóriában
    ///         tárolódnak, és az alkalmazás leállításakor elvesznek.
    ///     </para>
    ///     <para>
    ///         Az <see cref="OnModelCreating(ModelBuilder)"/> metódusban meghívja az
    ///         <c>AppDbContext</c> alapkonfigurációját, majd futtatja a <c>Seed()</c>
    ///         metódust, amely inicializálja a tesztadatokat.
    ///     </para>
    ///     <para>
    ///         Ez a kontextus elsősorban egységtesztekhez, oktatáshoz és
    ///         fejlesztés közbeni gyors prototípus-készítéshez használható.
    ///     </para>
    /// </remarks>
    /// <example>
    ///     Tipikus regisztráció a <c>Program.cs</c>-ben:
    ///     <code language="csharp">
    ///     builder.Services.AddDbContext<AppInMemoryDbContext>(options =>
    ///         options.UseInMemoryDatabase("MyAppTestDb"));
    ///     </code>
    /// </example>
    public class AppInMemoryDbContext : AppDbContext
    {
        public AppInMemoryDbContext(DbContextOptions<AppInMemoryDbContext> options) : base(options)
        {
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            // Alap konvenciók és konfigurációk betöltése az AppDbContext-ből
            base.OnModelCreating(modelBuilder);

            // Tesztadatok inicializálása
            modelBuilder.Seed();
        }
    }
}
