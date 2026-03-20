using Microsoft.EntityFrameworkCore;
using RoyalDelivery.Dotnet.Backend.DbMysqlModels;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddDbContext<RoyaldeliveryDbContext>(options =>
    options.UseMySql(
        builder.Configuration.GetConnectionString("RoyalDelivery"),
        ServerVersion.Parse("10.4.32-mariadb")
    ));

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowExpo", policy =>
    {
        policy
            .AllowAnyOrigin()
            .AllowAnyHeader()
            .AllowAnyMethod();
    });
});

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors("AllowExpo");

app.UseHttpsRedirection();
app.UseAuthorization();
app.MapControllers();

app.Run();