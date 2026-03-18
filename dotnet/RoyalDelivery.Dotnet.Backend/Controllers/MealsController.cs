using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using RoyalDelivery.Dotnet.Backend.DbMysqlModels;

namespace RoyalDelivery.Dotnet.Backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MealsController : ControllerBase
    {
        private readonly RoyaldeliveryDbContext _context = new();

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var result = await _context.Meals.ToListAsync();

            if (result.Count == 0)
            {
                return NotFound("Nincsenek ételek az adatbázisban!");
            }

            return Ok(result);
        }

        [HttpGet("{id:int}")]
        public async Task<IActionResult> GetById(int id)
        {
            var result = await _context.Meals.FindAsync(id);

            if (result == null)
            {
                return NotFound("Nem található a megadott azonosítójú étel!");
            }

            return Ok(result);
        }
    }
}
