using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using RoyalDelivery.Dotnet.Backend.DbMysqlModels;
using RoyalDelivery.Dotnet.Backend.Dtos;

namespace RoyalDelivery.Dotnet.Backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RestaurantsController : ControllerBase
    {
        private readonly RoyaldeliveryDbContext _context;

        public RestaurantsController(RoyaldeliveryDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var result = await _context.Restaurants.ToListAsync();
            return Ok(result);
        }

        [HttpGet("{id:int}")]
        public async Task<IActionResult> GetById(int id)
        {
            var result = await _context.Restaurants.FindAsync(id);

            if (result == null)
                return NotFound(new { error = "Nem található a megadott azonosítójú étterem!" });

            return Ok(result);
        }

        [HttpPost]
        public async Task<IActionResult> Create(CreateRestaurantDto dto)
        {
            var restaurant = new Restaurant
            {
                Name = dto.Name,
                OwnerId = dto.OwnerId
            };

            _context.Restaurants.Add(restaurant);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetById), new { id = restaurant.Id }, restaurant);
        }

        [HttpPut("{id:int}")]
        public async Task<IActionResult> Update(int id, CreateRestaurantDto dto)
        {
            var restaurant = await _context.Restaurants.FindAsync(id);

            if (restaurant == null)
                return NotFound(new { error = "Nem található az étterem!" });

            restaurant.Name = dto.Name;
            restaurant.OwnerId = dto.OwnerId;

            await _context.SaveChangesAsync();

            return Ok(restaurant);
        }

        [HttpDelete("{id:int}")]
        public async Task<IActionResult> Delete(int id)
        {
            var restaurant = await _context.Restaurants.FindAsync(id);

            if (restaurant == null)
                return NotFound(new { error = "Nem található az étterem!" });

            _context.Restaurants.Remove(restaurant);
            await _context.SaveChangesAsync();

            return Ok(new { message = "Étterem sikeresen törölve." });
        }
    }
}