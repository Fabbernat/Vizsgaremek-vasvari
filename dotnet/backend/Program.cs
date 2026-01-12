using MyApp.Backend.Context;
using MyApp.Backend.Extension;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddBackend();

var app = builder.Build();

// InMemory adatbázis inicializálása indításkor
// A CreateAsyncScope() egy ideiglenes szolgáltatási tartományt (scope-ot) hoz létre.
// Erre azért van szükség, mert a DbContext élettartama "Scoped", és nem kérhetõ közvetlenül az "app" szintjén.
using (var scope = app.Services.CreateAsyncScope())
{
    // Lekérjük az InMemory adatbázis kontextust a szolgáltatások közül.
    // Ha SQLite vagy MySQL lesz használva, akkor majd a megfelelõ contextet kell ide írni.
    var dbContext = scope.ServiceProvider.GetRequiredService<AppInMemoryDbContext>();

    // Az EnsureCreated() létrehozza az adatbázis szerkezetét (táblákat),
    // ha az még nem létezik. Ez InMemory esetén teljesen automatikus.
    // Itt NINCS migráció, mert az InMemory minden indításkor új üres adatbázist ad.
    dbContext.Database.EnsureCreated();
}

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

// CORS engedélyezése – a backend megmondja, honnan jöhetnek kérések (pl. frontendrõl)
app.UseCors(BackendExtension.CorsPolicyName);

app.UseAuthorization();

app.MapControllers();

app.Run();
