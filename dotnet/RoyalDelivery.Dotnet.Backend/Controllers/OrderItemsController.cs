using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using RoyalDelivery.Dotnet.Backend.DbModels;
using RoyalDelivery.Dotnet.Backend.DbMysqlModels;
using RoyalDelivery.Dotnet.Backend.Dtos;

namespace RoyalDelivery.Dotnet.Backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OrderItemsController : ControllerBase
    {
        private readonly RoyaldeliveryDbContext _context;

        public OrderItemsController(RoyaldeliveryDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var result = await _context.OrderItems
                .Select(oi => new
                {
                    id = oi.Id,
                    orderId = oi.OrderId,
                    mealId = oi.MealId,
                    quantity = oi.Quantity,
                    unitPrice = oi.UnitPrice
                })
                .ToListAsync();

            return Ok(result);
        }

        [HttpGet("{id:int}")]
        public async Task<IActionResult> GetById(int id)
        {
            var result = await _context.OrderItems
                .Where(oi => oi.Id == id)
                .Select(oi => new
                {
                    id = oi.Id,
                    orderId = oi.OrderId,
                    mealId = oi.MealId,
                    quantity = oi.Quantity,
                    unitPrice = oi.UnitPrice
                })
                .FirstOrDefaultAsync();

            if (result == null)
                return NotFound(new { error = "Nem található a megadott azonosítójú rendelési tétel." });

            return Ok(result);
        }

        [HttpGet("by-order/{orderId:int}")]
        public async Task<IActionResult> GetByOrderId(int orderId)
        {
            var result = await _context.OrderItems
                .Where(oi => oi.OrderId == orderId)
                .Select(oi => new
                {
                    id = oi.Id,
                    orderId = oi.OrderId,
                    mealId = oi.MealId,
                    quantity = oi.Quantity,
                    unitPrice = oi.UnitPrice
                })
                .ToListAsync();

            return Ok(result);
        }

        [HttpPost]
        public async Task<IActionResult> Create(CreateOrderItemDto dto)
        {
            var orderExists = await _context.Orders.AnyAsync(o => o.Id == dto.OrderId);
            if (!orderExists)
                return BadRequest(new { error = "A megadott order_id nem létezik." });

            var mealExists = await _context.Meals.AnyAsync(m => m.Id == dto.MealId);
            if (!mealExists)
                return BadRequest(new { error = "A megadott meal_id nem létezik." });

            var exists = await _context.OrderItems.AnyAsync(oi =>
                oi.OrderId == dto.OrderId && oi.MealId == dto.MealId);

            if (exists)
                return BadRequest(new { error = "Ez az étel már szerepel ebben a rendelésben." });

            var orderItem = new OrderItem
            {
                OrderId = dto.OrderId,
                MealId = dto.MealId,
                Quantity = dto.Quantity,
                UnitPrice = dto.UnitPrice
            };

            _context.OrderItems.Add(orderItem);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetById), new { id = orderItem.Id }, orderItem);
        }

        [HttpPut("{id:int}")]
        public async Task<IActionResult> Update(int id, CreateOrderItemDto dto)
        {
            var orderItem = await _context.OrderItems.FindAsync(id);
            if (orderItem == null)
                return NotFound(new { error = "Nem található a rendelési tétel." });

            var orderExists = await _context.Orders.AnyAsync(o => o.Id == dto.OrderId);
            if (!orderExists)
                return BadRequest(new { error = "A megadott order_id nem létezik." });

            var mealExists = await _context.Meals.AnyAsync(m => m.Id == dto.MealId);
            if (!mealExists)
                return BadRequest(new { error = "A megadott meal_id nem létezik." });

            var exists = await _context.OrderItems.AnyAsync(oi =>
                oi.OrderId == dto.OrderId && oi.MealId == dto.MealId && oi.Id != id);

            if (exists)
                return BadRequest(new { error = "Ez az étel már szerepel ebben a rendelésben." });

            orderItem.OrderId = dto.OrderId;
            orderItem.MealId = dto.MealId;
            orderItem.Quantity = dto.Quantity;
            orderItem.UnitPrice = dto.UnitPrice;

            await _context.SaveChangesAsync();

            return Ok(orderItem);
        }

        [HttpDelete("{id:int}")]
        public async Task<IActionResult> Delete(int id)
        {
            var orderItem = await _context.OrderItems.FindAsync(id);
            if (orderItem == null)
                return NotFound(new { error = "Nem található a rendelési tétel." });

            _context.OrderItems.Remove(orderItem);
            await _context.SaveChangesAsync();

            return Ok(new { message = "Rendelési tétel sikeresen törölve." });
        }
    }
}