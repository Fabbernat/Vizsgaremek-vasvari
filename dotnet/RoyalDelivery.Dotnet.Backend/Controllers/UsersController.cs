using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using RoyalDelivery.Dotnet.Backend.DbMysqlModels;
using RoyalDelivery.Dotnet.Backend.Dtos;

namespace RoyalDelivery.Dotnet.Backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly RoyaldeliveryDbContext _context;

        public UsersController(RoyaldeliveryDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var result = await _context.Users
                .Select(u => new
                {
                    id = u.Id,
                    username = u.Username,
                    firstname = u.FirstName,
                    lastname = u.LastName,
                    email = u.Email,
                    address = u.Address
                })
                .ToListAsync();

            return Ok(result);
        }

        [HttpGet("{id:int}")]
        public async Task<IActionResult> GetById(int id)
        {
            var result = await _context.Users
                .Where(u => u.Id == id)
                .Select(u => new
                {
                    id = u.Id,
                    username = u.Username,
                    firstname = u.FirstName,
                    lastname = u.LastName,
                    email = u.Email,
                    address = u.Address
                })
                .FirstOrDefaultAsync();

            if (result == null)
                return NotFound(new { error = "Nem található a megadott azonosítójú felhasználó!" });

            return Ok(result);
        }

        [HttpGet("by-username/{username}")]
        public async Task<IActionResult> GetByUsername(string username)
        {
            var result = await _context.Users
                .Where(u => u.Username == username)
                .Select(u => new
                {
                    id = u.Id,
                    username = u.Username,
                    firstname = u.FirstName,
                    lastname = u.LastName,
                    email = u.Email,
                    address = u.Address
                })
                .FirstOrDefaultAsync();

            if (result == null)
                return NotFound(new { error = "Nem található az adott nevű felhasználó!" });

            return Ok(result);
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register(RegisterUserDto dto)
        {
            var exists = await _context.Users.AnyAsync(u => u.Email == dto.Email || u.Username == dto.Username);

            if (exists)
            {
                return BadRequest(new { error = "Már létezik ilyen email vagy felhasználónév!" });
            }

            var user = new User
            {
                Username = dto.Username,
                FirstName = dto.FirstName,
                LastName = dto.LastName,
                Email = dto.Email,
                Password = dto.Password,
                Address = dto.Address
            };

            _context.Users.Add(user);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetById), new { id = user.Id }, new
            {
                id = user.Id,
                username = user.Username,
                firstname = user.FirstName,
                lastname = user.LastName,
                email = user.Email,
                address = user.Address
            });
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login(LoginDto dto)
        {
            var user = await _context.Users.FirstOrDefaultAsync(u =>
                u.Email == dto.Email && u.Password == dto.Password);

            if (user == null)
            {
                return Unauthorized(new { error = "Hibás email vagy jelszó!" });
            }

            return Ok(new
            {
                message = "Sikeres bejelentkezés",
                user = new
                {
                    id = user.Id,
                    username = user.Username,
                    firstname = user.FirstName,
                    lastname = user.LastName,
                    email = user.Email,
                    address = user.Address
                }
            });
        }

        [HttpPut("{id:int}")]
        public async Task<IActionResult> Update(int id, RegisterUserDto dto)
        {
            var user = await _context.Users.FindAsync(id);

            if (user == null)
                return NotFound(new { error = "Nem található a felhasználó!" });

            user.Username = dto.Username;
            user.FirstName = dto.FirstName;
            user.LastName = dto.LastName;
            user.Email = dto.Email;
            user.Password = dto.Password;
            user.Address = dto.Address;

            await _context.SaveChangesAsync();

            return Ok(new { message = "Felhasználó sikeresen módosítva." });
        }

        [HttpDelete("{id:int}")]
        public async Task<IActionResult> Delete(int id)
        {
            var user = await _context.Users.FindAsync(id);

            if (user == null)
                return NotFound(new { error = "Nem található a felhasználó!" });

            _context.Users.Remove(user);
            await _context.SaveChangesAsync();

            return Ok(new { message = "Felhasználó sikeresen törölve." });
        }
    }
}