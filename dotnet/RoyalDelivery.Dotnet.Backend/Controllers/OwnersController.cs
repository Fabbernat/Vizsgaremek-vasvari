using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using RoyalDelivery.Dotnet.Backend.DbMysqlModels;

namespace RoyalDelivery.Dotnet.Backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OwnersController : ControllerBase
    {
        private readonly RoyaldeliveryDbContext _context = new();

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var result = await _context.Owners
                .Select(o => new
                {
                    id = o.Id,
                    username = o.Username,
                    email = o.Email,
                    password = o.Password,
                    userId = o.UserId
                })
                .ToListAsync();

            if (result.Count == 0)
            {
                return NotFound("Nincsenek tulajdonosok az adatbázisban!");
            }

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
                    password = o.Password,
                    userId = o.UserId
                })
                .FirstOrDefaultAsync();

            if (result == null)
            {
                return NotFound("Nem található a megadott azonosítójú tulajdonos!");
            }

            return Ok(result);
        }
    }
}
