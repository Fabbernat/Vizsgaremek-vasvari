using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using RoyalDelivery.Dotnet.Backend.DbModels;
using RoyalDelivery.Dotnet.Backend.DbMysqlModels;
using RoyalDelivery.Dotnet.Backend.Dtos;

namespace RoyalDelivery.Dotnet.Backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MealsController : ControllerBase
    {
        private readonly RoyaldeliveryDbContext _context;

        public MealsController(RoyaldeliveryDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var result = await _context.Meals
                .Select(m => new
                {
                    id = m.Id,
                    name = m.Name,
                    description = m.Description,
                    price = m.Price,
                    restaurantId = m.RestaurantId
                })
                .ToListAsync();

            return Ok(result);
        }

        [HttpGet("{id:int}")]
        public async Task<IActionResult> GetById(int id)
        {
            var result = await _context.Meals
                .Where(m => m.Id == id)
                .Select(m => new
                {
                    id = m.Id,
                    name = m.Name,
                    description = m.Description,
                    price = m.Price,
                    restaurantId = m.RestaurantId
                })
                .FirstOrDefaultAsync();

            if (result == null)
                return NotFound(new { error = "Nem található a megadott azonosítójú étel." });

            return Ok(result);
        }

        [HttpGet("by-restaurant/{restaurantId:int}")]
        public async Task<IActionResult> GetByRestaurantId(int restaurantId)
        {
            var result = await _context.Meals
                .Where(m => m.RestaurantId == restaurantId)
                .Select(m => new
                {
                    id = m.Id,
                    name = m.Name,
                    description = m.Description,
                    price = m.Price,
                    restaurantId = m.RestaurantId
                })
                .ToListAsync();

            return Ok(result);
        }

        [HttpPost]
        public async Task<IActionResult> Create(CreateMealDto dto)
        {
            var restaurantExists = await _context.Restaurants.AnyAsync(r => r.Id == dto.RestaurantId);
            if (!restaurantExists)
                return BadRequest(new { error = "A megadott restaurant_id nem létezik." });

            var exists = await _context.Meals.AnyAsync(m =>
                m.Name == dto.Name && m.RestaurantId == dto.RestaurantId);

            if (exists)
                return BadRequest(new { error = "Ez az ételnév ennél az étteremnél már létezik." });

            var meal = new Meal
            {
                Name = dto.Name,
                Description = dto.Description,
                Price = dto.Price,
                RestaurantId = dto.RestaurantId
            };

            _context.Meals.Add(meal);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetById), new { id = meal.Id }, meal);
        }

        [HttpPut("{id:int}")]
        public async Task<IActionResult> Update(int id, CreateMealDto dto)
        {
            var meal = await _context.Meals.FindAsync(id);
            if (meal == null)
                return NotFound(new { error = "Nem található az étel." });

            var restaurantExists = await _context.Restaurants.AnyAsync(r => r.Id == dto.RestaurantId);
            if (!restaurantExists)
                return BadRequest(new { error = "A megadott restaurant_id nem létezik." });

            var exists = await _context.Meals.AnyAsync(m =>
                m.Name == dto.Name && m.RestaurantId == dto.RestaurantId && m.Id != id);

            if (exists)
                return BadRequest(new { error = "Ez az ételnév ennél az étteremnél már létezik." });

            meal.Name = dto.Name;
            meal.Description = dto.Description;
            meal.Price = dto.Price;
            meal.RestaurantId = dto.RestaurantId;

            await _context.SaveChangesAsync();

            return Ok(meal);
        }

        [HttpDelete("{id:int}")]
        public async Task<IActionResult> Delete(int id)
        {
            var meal = await _context.Meals.FindAsync(id);
            if (meal == null)
                return NotFound(new { error = "Nem található az étel." });

            _context.Meals.Remove(meal);
            await _context.SaveChangesAsync();

            return Ok(new { message = "Étel sikeresen törölve." });
        }
    }
}