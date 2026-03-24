using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using RoyalDelivery.Dotnet.Backend.DbModels;
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
            var result = await _context.Restaurants
                .Select(r => new
                {
                    id = r.Id,
                    name = r.Name,
                    ownerId = r.OwnerId
                })
                .ToListAsync();

            return Ok(result);
        }

        [HttpGet("{id:int}")]
        public async Task<IActionResult> GetById(int id)
        {
            var result = await _context.Restaurants
                .Where(r => r.Id == id)
                .Select(r => new
                {
                    id = r.Id,
                    name = r.Name,
                    ownerId = r.OwnerId
                })
                .FirstOrDefaultAsync();

            if (result == null)
                return NotFound(new { error = "Nem található a megadott azonosítójú étterem." });

            return Ok(result);
        }

        [HttpGet("by-owner/{ownerId:int}")]
        public async Task<IActionResult> GetByOwnerId(int ownerId)
        {
            var result = await _context.Restaurants
                .Where(r => r.OwnerId == ownerId)
                .Select(r => new
                {
                    id = r.Id,
                    name = r.Name,
                    ownerId = r.OwnerId
                })
                .ToListAsync();

            return Ok(result);
        }

        [HttpPost]
        public async Task<IActionResult> Create(CreateRestaurantDto dto)
        {
            var owner = await _context.Users.FirstOrDefaultAsync(u => u.Id == dto.OwnerId && u.Role == "owner");
            if (owner == null)
                return BadRequest(new { error = "A megadott owner_id nem létező tulajdonos." });

            var exists = await _context.Restaurants.AnyAsync(r => r.Name == dto.Name && r.OwnerId == dto.OwnerId);
            if (exists)
                return BadRequest(new { error = "Ez az étteremnév ennél a tulajdonosnál már létezik." });

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
                return NotFound(new { error = "Nem található az étterem." });

            var owner = await _context.Users.FirstOrDefaultAsync(u => u.Id == dto.OwnerId && u.Role == "owner");
            if (owner == null)
                return BadRequest(new { error = "A megadott owner_id nem létező tulajdonos." });

            var exists = await _context.Restaurants.AnyAsync(r =>
                r.Name == dto.Name && r.OwnerId == dto.OwnerId && r.Id != id);

            if (exists)
                return BadRequest(new { error = "Ez az étteremnév ennél a tulajdonosnál már létezik." });

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
                return NotFound(new { error = "Nem található az étterem." });

            _context.Restaurants.Remove(restaurant);
            await _context.SaveChangesAsync();

            return Ok(new { message = "Étterem sikeresen törölve." });
        }
    }
}