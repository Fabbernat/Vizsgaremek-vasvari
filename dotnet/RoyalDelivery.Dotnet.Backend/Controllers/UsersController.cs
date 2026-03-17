using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using RoyalDelivery.Dotnet.Backend.DbMysqlModels;

namespace RoyalDelivery.Dotnet.Backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly RoyaldeliveryDbContext _context = new();

        [HttpGet("user/{username}")]
        public async Task<IActionResult> GetByUsername(string username)
        {
            var result = await _context.Users.Where(u => u.Username == username).Select(u => new
            {
                id = u.Id,
                name = u.Username,
                firstname = u.FirstName,
                lastname = u.LastName,
                email = u.Email,
                password = u.Password,
                address = u.Address,
            }
            ).ToListAsync();
            if (result.Count == 0)
            {
                return NotFound("Nem található az adott nevű felhasználó!");
            }
            else
            {
                return Ok(result);
            }
        }
    }
}
