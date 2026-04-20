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
                    name = s.Name,
                    ownerId = s.OwnerId
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
                    name = s.Name,
                    ownerId = s.OwnerId
                })
                .FirstOrDefaultAsync();

            if (result == null)
                return NotFound(new { error = "Nem található a megadott azonosítójú bolt." });

            return Ok(result);
        }

        [HttpGet("by-owner/{ownerId:int}")]
        public async Task<IActionResult> GetByOwnerId(int ownerId)
        {
            var result = await _context.Shops
                .Where(s => s.OwnerId == ownerId)
                .Select(s => new
                {
                    id = s.Id,
                    name = s.Name,
                    ownerId = s.OwnerId
                })
                .ToListAsync();

            return Ok(result);
        }

        [HttpPost]
        public async Task<IActionResult> Create(CreateShopDto dto)
        {
            var owner = await _context.Users.FirstOrDefaultAsync(u => u.Id == dto.OwnerId && u.Role == "owner");
            if (owner == null)
                return BadRequest(new { error = "A megadott owner_id nem létező tulajdonos." });

            var exists = await _context.Shops.AnyAsync(s => s.Name == dto.Name && s.OwnerId == dto.OwnerId);
            if (exists)
                return BadRequest(new { error = "Ez a boltnév ennél a tulajdonosnál már létezik." });

            var shop = new Shop
            {
                Name = dto.Name,
                OwnerId = dto.OwnerId
            };

            _context.Shops.Add(shop);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetById), new { id = shop.Id }, shop);
        }

        [HttpPut("{id:int}")]
        public async Task<IActionResult> Update(int id, CreateShopDto dto)
        {
            var shop = await _context.Shops.FindAsync(id);
            if (shop == null)
                return NotFound(new { error = "Nem található a bolt." });

            var owner = await _context.Users.FirstOrDefaultAsync(u => u.Id == dto.OwnerId && u.Role == "owner");
            if (owner == null)
                return BadRequest(new { error = "A megadott owner_id nem létező tulajdonos." });

            var exists = await _context.Shops.AnyAsync(s =>
                s.Name == dto.Name && s.OwnerId == dto.OwnerId && s.Id != id);

            if (exists)
                return BadRequest(new { error = "Ez a boltnév ennél a tulajdonosnál már létezik." });

            shop.Name = dto.Name;
            shop.OwnerId = dto.OwnerId;

            await _context.SaveChangesAsync();

            return Ok(shop);
        }

        [HttpDelete("{id:int}")]
        public async Task<IActionResult> Delete(int id)
        {
            var shop = await _context.Shops.FindAsync(id);
            if (shop == null)
                return NotFound(new { error = "Nem található a bolt." });

            _context.Shops.Remove(shop);
            await _context.SaveChangesAsync();

            return Ok(new { message = "Bolt sikeresen törölve." });
        }
    }
}