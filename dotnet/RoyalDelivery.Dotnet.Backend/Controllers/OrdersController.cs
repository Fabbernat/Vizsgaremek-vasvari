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
            var result = await _context.Orders.ToListAsync();
            return Ok(result);
        }

        [HttpGet("{id:int}")]
        public async Task<IActionResult> GetById(int id)
        {
            var result = await _context.Orders.FindAsync(id);

            if (result == null)
                return NotFound(new { error = "Nem található a megadott azonosítójú rendelés!" });

            return Ok(result);
        }

        [HttpPost]
        public async Task<IActionResult> Create(CreateOrderDto dto)
        {
            var order = new Order
            {
                RestaurantId = dto.RestaurantId,
                UserId = dto.UserId,
                Date = dto.Date
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
                return NotFound(new { error = "Nem található a rendelés!" });

            order.RestaurantId = dto.RestaurantId;
            order.UserId = dto.UserId;
            order.Date = dto.Date;

            await _context.SaveChangesAsync();

            return Ok(order);
        }

        [HttpDelete("{id:int}")]
        public async Task<IActionResult> Delete(int id)
        {
            var order = await _context.Orders.FindAsync(id);

            if (order == null)
                return NotFound(new { error = "Nem található a rendelés!" });

            _context.Orders.Remove(order);
            await _context.SaveChangesAsync();

            return Ok(new { message = "Rendelés törölve." });
        }
    }
}