using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using RoyalDelivery.Dotnet.Backend.DbMysqlModels;
using RoyalDelivery.Dotnet.Backend.Dtos;

namespace RoyalDelivery.Dotnet.Backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ShopsController : ControllerBase
    {
        private readonly RoyaldeliveryDbContext _context;

        public ShopsController(RoyaldeliveryDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var result = await _context.Shops
                .Select(s => new
                {
                    id = s.Id,
                    name = s.Name
                })
                .ToListAsync();

            return Ok(result);
        }

        [HttpGet("{id:int}")]
        public async Task<IActionResult> GetById(int id)
        {
            var result = await _context.Shops
                .Where(s => s.Id == id)
                .Select(s => new
                {
                    id = s.Id,
                    name = s.Name
                })
                .FirstOrDefaultAsync();

            if (result == null)
                return NotFound(new { error = "Nem található a megadott azonosítójú bolt!" });

            return Ok(result);
        }

        [HttpPost]
        public async Task<IActionResult> Create(CreateShopDto dto)
        {
            var shop = new Shop
            {
                Name = dto.Name
            };

            _context.Shops.Add(shop);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetById), new { id = shop.Id }, new
            {
                id = shop.Id,
                name = shop.Name
            });
        }

        [HttpPut("{id:int}")]
        public async Task<IActionResult> Update(int id, CreateShopDto dto)
        {
            var shop = await _context.Shops.FindAsync(id);

            if (shop == null)
                return NotFound(new { error = "Nem található a bolt!" });

            shop.Name = dto.Name;

            await _context.SaveChangesAsync();

            return Ok(new
            {
                id = shop.Id,
                name = shop.Name
            });
        }

        [HttpDelete("{id:int}")]
        public async Task<IActionResult> Delete(int id)
        {
            var shop = await _context.Shops.FindAsync(id);

            if (shop == null)
                return NotFound(new { error = "Nem található a bolt!" });

            _context.Shops.Remove(shop);
            await _context.SaveChangesAsync();

            return Ok(new { message = "Bolt sikeresen törölve." });
        }
    }
}