using Application.Interfaces;
using Domain.Model;
using Microsoft.AspNetCore.Mvc;

namespace Clinic_Management_System.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IAuthServices _authServices;

        public AuthController(IAuthServices authServices)
        {
            _authServices = authServices;
        }

        [HttpGet("login")]
        public async Task<IActionResult> GetUserAuth(string email, string password)
        {
            var user = await _authServices.GetUserAsync(email, password);

            if (user == null)
            {
                return Unauthorized("Invalid Email Or Password");
            }

            return Ok(user);
        }

        [HttpPost("register")]
        public async Task<IActionResult> RegisterUser(Users user)
        {
            var newUser = await _authServices.RegisterUserAsync(user);

            if (newUser == null)
            {
                return BadRequest("Email already exists");
            }

            return Ok(newUser);
        }
    }
}                                                       