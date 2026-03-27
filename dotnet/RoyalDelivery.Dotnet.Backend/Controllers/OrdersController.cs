using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using RoyalDelivery.Dotnet.Backend.DbMysqlModels;
using RoyalDelivery.Dotnet.Backend.Dtos;

namespace RoyalDelivery.Dotnet.Backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OrdersController : ControllerBase
    {
        private readonly RoyaldeliveryDbContext _context;

        public OrdersController(RoyaldeliveryDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var result = await _context.Orders
                .Select(o => new
                {
                    id = o.Id,
                    restaurantId = o.RestaurantId,
                    userId = o.UserId,
                    orderedAt = o.OrderedAt
                })
                .ToListAsync();

            return Ok(result);
        }

        [HttpGet("{id:int}")]
        public async Task<IActionResult> GetById(int id)
        {
            var result = await _context.Orders
                .Where(o => o.Id == id)
                .Select(o => new
                {
                    id = o.Id,
                    restaurantId = o.RestaurantId,
                    userId = o.UserId,
                    orderedAt = o.OrderedAt
                })
                .FirstOrDefaultAsync();

            if (result == null)
                return NotFound(new { error = "Nem található a megadott azonosítójú rendelés." });

            return Ok(result);
        }

        [HttpGet("by-user/{userId:int}")]
        public async Task<IActionResult> GetByUserId(int userId)
        {
            var result = await _context.Orders
                .Where(o => o.UserId == userId)
                .Select(o => new
                {
                    id = o.Id,
                    restaurantId = o.RestaurantId,
                    userId = o.UserId,
                    orderedAt = o.OrderedAt
                })
                .ToListAsync();

            return Ok(result);
        }

        [HttpGet("by-restaurant/{restaurantId:int}")]
        public async Task<IActionResult> GetByRestaurantId(int restaurantId)
        {
            var result = await _context.Orders
                .Where(o => o.RestaurantId == restaurantId)
                .Select(o => new
                {
                    id = o.Id,
                    restaurantId = o.RestaurantId,
                    userId = o.UserId,
                    orderedAt = o.OrderedAt
                })
                .ToListAsync();

            return Ok(result);
        }

        [HttpPost]
        public async Task<IActionResult> Create(CreateOrderDto dto)
        {
            var restaurantExists = await _context.Restaurants.AnyAsync(r => r.Id == dto.RestaurantId);
            if (!restaurantExists)
                return BadRequest(new { error = "A megadott restaurant_id nem létezik." });

            var userExists = await _context.Users.AnyAsync(u => u.Id == dto.UserId);
            if (!userExists)
                return BadRequest(new { error = "A megadott user_id nem létezik." });

            var order = new Order
            {
                RestaurantId = dto.RestaurantId,
                UserId = dto.UserId,
                OrderedAt = dto.OrderedAt
            };

            _context.Orders.Add(order);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetById), new { id = order.Id }, order);
        }

        [HttpPut("{id:int}")]
        public async Task<IActionResult> Update(int id, CreateOrderDto dto)
        {
            var order = await _context.Orders.FindAsync(id);
            if (order == null)
                return NotFound(new { error = "Nem található a rendelés." });

            var restaurantExists = await _context.Restaurants.AnyAsync(r => r.Id == dto.RestaurantId);
            if (!restaurantExists)
                return BadRequest(new { error = "A megadott restaurant_id nem létezik." });

            var userExists = await _context.Users.AnyAsync(u => u.Id == dto.UserId);
            if (!userExists)
                return BadRequest(new { error = "A megadott user_id nem létezik." });

            order.RestaurantId = dto.RestaurantId;
            order.UserId = dto.UserId;
            order.OrderedAt = dto.OrderedAt;

            await _context.SaveChangesAsync();

            return Ok(order);
        }

        [HttpDelete("{id:int}")]
        public async Task<IActionResult> Delete(int id)
        {
            var order = await _context.Orders.FindAsync(id);
            if (order == null)
                return NotFound(new { error = "Nem található a rendelés." });

            _context.Orders.Remove(order);
            await _context.SaveChangesAsync();

            return Ok(new { message = "Rendelés sikeresen törölve." });
        }
    }
}