using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using RoyalDelivery.Dotnet.Backend.DbModels;
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
                    firstName = u.FirstName,
                    lastName = u.LastName,
                    email = u.Email,
                    address = u.Address,
                    role = u.Role
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
                    firstName = u.FirstName,
                    lastName = u.LastName,
                    email = u.Email,
                    address = u.Address,
                    role = u.Role
                })
                .FirstOrDefaultAsync();

            if (result == null)
                return NotFound(new { error = "Nem található a megadott azonosítójú felhasználó." });

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
                    firstName = u.FirstName,
                    lastName = u.LastName,
                    email = u.Email,
                    address = u.Address,
                    role = u.Role
                })
                .FirstOrDefaultAsync();

            if (result == null)
                return NotFound(new { error = "Nem található ilyen felhasználónév." });

            return Ok(result);
        }

        [HttpGet("owners")]
        public async Task<IActionResult> GetOwners()
        {
            var result = await _context.Users
                .Where(u => u.Role == "owner")
                .Select(u => new
                {
                    id = u.Id,
                    username = u.Username,
                    firstName = u.FirstName,
                    lastName = u.LastName,
                    email = u.Email,
                    address = u.Address,
                    role = u.Role
                })
                .ToListAsync();

            return Ok(result);
        }

        [HttpGet("couriers")]
        public async Task<IActionResult> GetCouriers()
        {
            var result = await _context.Users
                .Where(u => u.Role == "courier")
                .Select(u => new
                {
                    id = u.Id,
                    username = u.Username,
                    firstName = u.FirstName,
                    lastName = u.LastName,
                    email = u.Email,
                    address = u.Address,
                    role = u.Role
                })
                .ToListAsync();

            return Ok(result);
        }

        [HttpPost]
        public async Task<IActionResult> Create(CreateUserDto dto)
        {
            var emailExists = await _context.Users.AnyAsync(u => u.Email == dto.Email);
            if (emailExists)
                return BadRequest(new { error = "Ez az email cím már foglalt." });

            var usernameExists = await _context.Users.AnyAsync(u => u.Username == dto.Username);
            if (usernameExists)
                return BadRequest(new { error = "Ez a felhasználónév már foglalt." });

            var user = new User
            {
                Username = dto.Username,
                FirstName = dto.FirstName,
                LastName = dto.LastName,
                Email = dto.Email,
                PasswordHash = dto.PasswordHash,
                Address = dto.Address,
                Role = dto.Role
            };

            _context.Users.Add(user);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetById), new { id = user.Id }, new
            {
                id = user.Id,
                username = user.Username,
                firstName = user.FirstName,
                lastName = user.LastName,
                email = user.Email,
                address = user.Address,
                role = user.Role
            });
        }

        [HttpPut("{id:int}")]
        public async Task<IActionResult> Update(int id, CreateUserDto dto)
        {
            var user = await _context.Users.FindAsync(id);

            if (user == null)
                return NotFound(new { error = "Nem található a felhasználó." });

            var emailTaken = await _context.Users.AnyAsync(u => u.Email == dto.Email && u.Id != id);
            if (emailTaken)
                return BadRequest(new { error = "Ez az email cím már másik felhasználónál szerepel." });

            var usernameTaken = await _context.Users.AnyAsync(u => u.Username == dto.Username && u.Id != id);
            if (usernameTaken)
                return BadRequest(new { error = "Ez a felhasználónév már másik felhasználónál szerepel." });

            user.Username = dto.Username;
            user.FirstName = dto.FirstName;
            user.LastName = dto.LastName;
            user.Email = dto.Email;
            user.PasswordHash = dto.PasswordHash;
            user.Address = dto.Address;
            user.Role = dto.Role;

            await _context.SaveChangesAsync();

            return Ok(new
            {
                id = user.Id,
                username = user.Username,
                firstName = user.FirstName,
                lastName = user.LastName,
                email = user.Email,
                address = user.Address,
                role = user.Role
            });
        }

        [HttpDelete("{id:int}")]
        public async Task<IActionResult> Delete(int id)
        {
            var user = await _context.Users.FindAsync(id);

            if (user == null)
                return NotFound(new { error = "Nem található a felhasználó." });

            _context.Users.Remove(user);
            await _context.SaveChangesAsync();

            return Ok(new { message = "Felhasználó sikeresen törölve." });
        }
    }
}