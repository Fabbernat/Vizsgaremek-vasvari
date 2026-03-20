using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using RoyalDelivery.Dotnet.Backend.DbMysqlModels;
using RoyalDelivery.Dotnet.Backend.Dtos;

namespace RoyalDelivery.Dotnet.Backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OwnersController : ControllerBase
    {
        private readonly RoyaldeliveryDbContext _context;

        public OwnersController(RoyaldeliveryDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var result = await _context.Owners
                .Select(o => new
                {
                    id = o.Id,
                    username = o.Username,
                    email = o.Email,
                    userId = o.UserId
                })
                .ToListAsync();

            return Ok(result);
        }

        [HttpGet("{id:int}")]
        public async Task<IActionResult> GetById(int id)
        {
            var result = await _context.Owners
                .Where(o => o.Id == id)
                .Select(o => new
                {
                    id = o.Id,
                    username = o.Username,
                    email = o.Email,
                    userId = o.UserId
                })
                .FirstOrDefaultAsync();

            if (result == null)
                return NotFound(new { error = "Nem található a megadott azonosítójú tulajdonos!" });

            return Ok(result);
        }

        [HttpPost]
        public async Task<IActionResult> Create(CreateOwnerDto dto)
        {
            var owner = new Owner
            {
                Username = dto.Username,
                Email = dto.Email,
                Password = dto.Password,
                UserId = dto.UserId
            };

            _context.Owners.Add(owner);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetById), new { id = owner.Id }, new
            {
                id = owner.Id,
                username = owner.Username,
                email = owner.Email,
                userId = owner.UserId
            });
        }

        [HttpPut("{id:int}")]
        public async Task<IActionResult> Update(int id, CreateOwnerDto dto)
        {
            var owner = await _context.Owners.FindAsync(id);

            if (owner == null)
                return NotFound(new { error = "Nem található a tulajdonos!" });

            owner.Username = dto.Username;
            owner.Email = dto.Email;
            owner.Password = dto.Password;
            owner.UserId = dto.UserId;

            await _context.SaveChangesAsync();

            return Ok(new
            {
                id = owner.Id,
                username = owner.Username,
                email = owner.Email,
                userId = owner.UserId
            });
        }

        [HttpDelete("{id:int}")]
        public async Task<IActionResult> Delete(int id)
        {
            var owner = await _context.Owners.FindAsync(id);

            if (owner == null)
                return NotFound(new { error = "Nem található a tulajdonos!" });

            _context.Owners.Remove(owner);
            await _context.SaveChangesAsync();

            return Ok(new { message = "Tulajdonos sikeresen törölve." });
        }
    }
}