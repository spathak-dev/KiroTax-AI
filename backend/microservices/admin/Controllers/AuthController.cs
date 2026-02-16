using Microsoft.AspNetCore.Mvc;
using admin.Services;

namespace admin.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AuthController : ControllerBase
{
    private readonly IAuthService _authService;
    private readonly ILogger<AuthController> _logger;

    public AuthController(IAuthService authService, ILogger<AuthController> logger)
    {
        _authService = authService;
        _logger = logger;
    }

    [HttpPost("login")]
    public async Task<ActionResult<AuthResponse>> Login([FromBody] LoginRequest request)
    {
        if (string.IsNullOrEmpty(request.Email) || string.IsNullOrEmpty(request.Password))
        {
            return BadRequest(new { message = "Email and password are required" });
        }

        var result = await _authService.LoginAsync(request.Email, request.Password);

        if (!result.Success)
        {
            return Unauthorized(new { message = result.Message });
        }

        return Ok(new AuthResponse
        {
            Token = result.Token!,
            RefreshToken = result.RefreshToken!,
            User = new UserDto
            {
                Id = result.User!.Id,
                Name = result.User.Name,
                Email = result.User.Email,
                Role = result.User.Role,
                Company = result.User.Company
            }
        });
    }

    [HttpPost("refresh")]
    public async Task<ActionResult<AuthResponse>> RefreshToken([FromBody] RefreshTokenRequest request)
    {
        var result = await _authService.RefreshTokenAsync(request.RefreshToken);

        if (!result.Success)
        {
            return Unauthorized(new { message = result.Message });
        }

        return Ok(new AuthResponse
        {
            Token = result.Token!,
            RefreshToken = result.RefreshToken!,
            User = new UserDto
            {
                Id = result.User!.Id,
                Name = result.User.Name,
                Email = result.User.Email,
                Role = result.User.Role,
                Company = result.User.Company
            }
        });
    }

    [HttpPost("validate")]
    public async Task<ActionResult<ValidateTokenResponse>> ValidateToken([FromBody] ValidateTokenRequest request)
    {
        var isValid = await _authService.ValidateTokenAsync(request.Token);
        return Ok(new ValidateTokenResponse { IsValid = isValid });
    }
}

// DTOs
public class LoginRequest
{
    public string Email { get; set; } = string.Empty;
    public string Password { get; set; } = string.Empty;
}

public class RefreshTokenRequest
{
    public string RefreshToken { get; set; } = string.Empty;
}

public class ValidateTokenRequest
{
    public string Token { get; set; } = string.Empty;
}

public class AuthResponse
{
    public string Token { get; set; } = string.Empty;
    public string RefreshToken { get; set; } = string.Empty;
    public UserDto User { get; set; } = null!;
}

public class UserDto
{
    public int Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public string Email { get; set; } = string.Empty;
    public string Role { get; set; } = string.Empty;
    public string? Company { get; set; }
}

public class ValidateTokenResponse
{
    public bool IsValid { get; set; }
}
