using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using RoyalDelivery.Dotnet.Backend.DbMysqlModels;

namespace RoyalDelivery.Dotnet.Backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ShopsController : ControllerBase
    {
        private readonly RoyaldeliveryDbContext _context = new();

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

            if (result.Count == 0)
            {
                return NotFound("Nincsenek boltok az adatbázisban!");
            }

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
            {
                return NotFound("Nem található a megadott azonosítójú bolt!");
            }

            return Ok(result);
        }
    }
}
