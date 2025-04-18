//using Microsoft.AspNetCore.Identity;
//using Microsoft.AspNetCore.Identity.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
using BackEndApi.Data;
using BackEndApi.Models;
using BackEndApi.DTO;
using Google.Apis.Auth;





//[Authorize]  // with autorization links
//[Authorize]

namespace BackEndApi.Controllers
{

    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly UserDbContext _context;
        //private readonly IConfiguration _configuration;

        public AuthController(UserDbContext context)
        {
            _context = context;
            //_configuration = configuration;
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] UserRegister request)
        {
            Console.WriteLine(request.Username);
            Console.WriteLine(request.RepeatPassword);
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            if (await _context.Users.AnyAsync(u => u.Username == request.Username))
                return BadRequest("Username already exists");

            if (request.Password != request.RepeatPassword)
                return BadRequest("Passwords don't match");

            using var hmac = new HMACSHA512(Security.AppSecurity.GlobalSalt);
            request.Password = Convert.ToBase64String(hmac.ComputeHash(Encoding.UTF8.GetBytes(request.Password)));

            var user = new User
            {
                Username = request.Username,
                Password = request.Password
            };

            _context.Users.Add(user);
            await _context.SaveChangesAsync();

            return Ok(new { Message = "User registered successfully." });
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] UserLogin request)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var user = await _context.Users.SingleOrDefaultAsync(u => u.Username == request.Username);
            if (user == null)
                return Unauthorized("User not found");

            using var hmac = new HMACSHA512(Security.AppSecurity.GlobalSalt);
            var computedHash = Convert.ToBase64String(hmac.ComputeHash(Encoding.UTF8.GetBytes(request.Password)));

            if (computedHash != user.Password)
                return Unauthorized("Invalid password");

            var token = GenerateJwtToken2(user);

            //prepaare response
            //var response = 
            return Ok(new
            {
                Message = "Login successful.",
                AccessToken = token,
                UserId = user.Id,
            });
        }

        //[HttpPost("gmail")]
        //public async Task<IActionResult> GoogleLogin([FromBody] GoogleTokenDTO googleToken)
        //{
        //    var payload = await GoogleJsonWebSignature.ValidateAsync(googleToken.IdToken);
        //    if (payload == null)
        //    {
        //        return Unauthorized();
        //    }

        //    var user = await _context.Users.SingleOrDefaultAsync(u => u.GoogleId == payload.Subject);
        //    if (user == null)
        //    {
        //        Console.WriteLine(payload.Subject);
        //        user = new User
        //        {
        //            GoogleId = payload.Subject,
        //            Email = payload.Email,
        //            //Name = payload.Name,
        //            Username = GenerateRandomUsername(payload.Name).Trim()
        //        };
        //        _context.Users.Add(user);
        //        await _context.SaveChangesAsync();
        //    }

        //    var token = GenerateJwtToken2(user);
        //    return Ok(new
        //    {
        //        Message = "Login successful.",
        //        AccessToken = token,
        //        UserId = user.Id,
        //    });
        //    //return Ok(new { Token = token });
        //}

        [HttpGet("profile")]
        public async Task<IActionResult> GetProfile([FromQuery] UserProfileIdDTO request)
        {
            var user = await _context.Users
                .AsNoTracking() // Optional: Improve performance by avoiding change tracking
                .FirstOrDefaultAsync(u => u.Id == request.Id);

            if (user == null)
            {
                return NotFound(new { message = "User not found" });
            }

            var userProfile = new UserProfileDTO
            {
                Username = user.Username,
                Email = user.Email
                // Do not include Password for security reasons
            };

            return Ok(userProfile);
        }

        [HttpPut("profile/update")]
        public async Task<IActionResult> UpdateProfile([FromBody] UserProfileUpdateDTO request)
        {
            var user = await _context.Users.FirstOrDefaultAsync(u => u.Id == request.Id);
            if (user == null)
            {
                return NotFound(new { message = "User not found" });
            }
            user.Username = request.Username;
            user.Email = request.Email;
            if (!string.IsNullOrEmpty(request.Password))
            {
                using var hmac = new HMACSHA512(Security.AppSecurity.GlobalSalt);
                request.Password = Convert.ToBase64String(hmac.ComputeHash(Encoding.UTF8.GetBytes(request.Password)));
                user.Password = request.Password; // You should hash the password before storing it
            }
            _context.Users.Update(user);
            await _context.SaveChangesAsync();
            return Ok(new { message = "Profile updated successfully" });
        }



        private string GenerateRandomUsername(string name)
        {
            var random = new Random(); return $"{name}{random.Next(1000, 9999)}";
        }


        private string GenerateJwtToken2(User user)
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.UTF8.GetBytes("YourSuperSecureAndLongJWTSigningKey12345");
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new[]
                {
                new Claim(ClaimTypes.Name, user.Username),
                new Claim(ClaimTypes.NameIdentifier, user.Id.ToString())
            }),
                Expires = DateTime.UtcNow.AddHours(1),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };

            var token = tokenHandler.CreateToken(tokenDescriptor);
            return tokenHandler.WriteToken(token);
        }
    }

}

