using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using admin.Data;

namespace admin.Controllers;

[ApiController]
[Route("api/admin")]
public class AdminController : ControllerBase
{
    private readonly AppDbContext _context;
    private readonly ILogger<AdminController> _logger;

    public AdminController(AppDbContext context, ILogger<AdminController> logger)
    {
        _context = context;
        _logger = logger;
    }

    // ============ USERS ============
    
    [HttpGet("users")]
    public async Task<ActionResult<IEnumerable<User>>> GetUsers(
        [FromQuery] string? role = null,
        [FromQuery] string? search = null)
    {
        var query = _context.Users.AsQueryable();

        if (!string.IsNullOrEmpty(role))
            query = query.Where(u => u.Role == role);

        if (!string.IsNullOrEmpty(search))
            query = query.Where(u => u.Name.Contains(search) || u.Email.Contains(search));

        return await query.OrderByDescending(u => u.CreatedAt).ToListAsync();
    }

    [HttpGet("users/{id}")]
    public async Task<ActionResult<User>> GetUser(int id)
    {
        var user = await _context.Users.FindAsync(id);
        if (user == null)
            return NotFound(new { message = "User not found" });

        return user;
    }

    [HttpPost("users")]
    public async Task<ActionResult<User>> CreateUser(User user)
    {
        user.CreatedAt = DateTime.UtcNow;
        _context.Users.Add(user);
        await _context.SaveChangesAsync();

        await LogActivity("user_created", $"Created user: {user.Name}", user.Id, "User", user.Id);

        return CreatedAtAction(nameof(GetUser), new { id = user.Id }, user);
    }

    [HttpPut("users/{id}")]
    public async Task<IActionResult> UpdateUser(int id, User user)
    {
        if (id != user.Id)
            return BadRequest(new { message = "ID mismatch" });

        var existingUser = await _context.Users.FindAsync(id);
        if (existingUser == null)
            return NotFound(new { message = "User not found" });

        existingUser.Name = user.Name;
        existingUser.Email = user.Email;
        existingUser.Role = user.Role;
        existingUser.Company = user.Company;
        existingUser.IsActive = user.IsActive;

        await _context.SaveChangesAsync();
        await LogActivity("user_updated", $"Updated user: {user.Name}", null, "User", id);

        return NoContent();
    }

    [HttpDelete("users/{id}")]
    public async Task<IActionResult> DeleteUser(int id)
    {
        var user = await _context.Users.FindAsync(id);
        if (user == null)
            return NotFound(new { message = "User not found" });

        // Prevent deleting last admin
        if (user.Role == "admin")
        {
            var adminCount = await _context.Users.CountAsync(u => u.Role == "admin");
            if (adminCount <= 1)
                return BadRequest(new { message = "Cannot delete the last admin user" });
        }

        _context.Users.Remove(user);
        await _context.SaveChangesAsync();
        await LogActivity("user_deleted", $"Deleted user: {user.Name}", null, "User", id);

        return NoContent();
    }

    // ============ BILLS ============
    
    [HttpGet("bills")]
    public async Task<ActionResult<IEnumerable<Bill>>> GetBills(
        [FromQuery] string? status = null,
        [FromQuery] int? userId = null)
    {
        var query = _context.Bills.AsQueryable();

        if (!string.IsNullOrEmpty(status))
            query = query.Where(b => b.Status == status);

        if (userId.HasValue)
            query = query.Where(b => b.UserId == userId.Value);

        return await query.OrderByDescending(b => b.CreatedAt).ToListAsync();
    }

    [HttpGet("bills/{id}")]
    public async Task<ActionResult<Bill>> GetBill(int id)
    {
        var bill = await _context.Bills.FindAsync(id);
        if (bill == null)
            return NotFound(new { message = "Bill not found" });

        return bill;
    }

    [HttpPut("bills/{id}/status")]
    public async Task<IActionResult> UpdateBillStatus(int id, [FromBody] BillStatusUpdate update)
    {
        var bill = await _context.Bills.FindAsync(id);
        if (bill == null)
            return NotFound(new { message = "Bill not found" });

        bill.Status = update.Status;
        if (update.Status == "processed")
            bill.ProcessedAt = DateTime.UtcNow;

        await _context.SaveChangesAsync();
        await LogActivity("bill_status_updated", $"Bill {bill.FileName} status changed to {update.Status}", null, "Bill", id);

        return NoContent();
    }

    // ============ TEMPLATES ============
    
    [HttpGet("templates")]
    public async Task<ActionResult<IEnumerable<Template>>> GetTemplates(
        [FromQuery] string? status = null,
        [FromQuery] string? category = null)
    {
        var query = _context.Templates.AsQueryable();

        if (!string.IsNullOrEmpty(status))
            query = query.Where(t => t.Status == status);

        if (!string.IsNullOrEmpty(category))
            query = query.Where(t => t.Category == category);

        return await query.OrderByDescending(t => t.CreatedAt).ToListAsync();
    }

    [HttpGet("templates/{id}")]
    public async Task<ActionResult<Template>> GetTemplate(int id)
    {
        var template = await _context.Templates.FindAsync(id);
        if (template == null)
            return NotFound(new { message = "Template not found" });

        return template;
    }

    [HttpPut("templates/{id}/approve")]
    public async Task<IActionResult> ApproveTemplate(int id, [FromBody] TemplateApproval approval)
    {
        var template = await _context.Templates.FindAsync(id);
        if (template == null)
            return NotFound(new { message = "Template not found" });

        template.Status = approval.Approved ? "published" : "rejected";
        await _context.SaveChangesAsync();

        var action = approval.Approved ? "approved" : "rejected";
        await LogActivity($"template_{action}", $"Template {template.Name} was {action}", null, "Template", id);

        return NoContent();
    }

    // ============ ACTIVITY ============
    
    [HttpGet("activity")]
    public async Task<ActionResult<IEnumerable<ActivityLog>>> GetActivity(
        [FromQuery] int limit = 50,
        [FromQuery] string? entityType = null)
    {
        var query = _context.ActivityLogs.AsQueryable();

        if (!string.IsNullOrEmpty(entityType))
            query = query.Where(a => a.EntityType == entityType);

        return await query
            .OrderByDescending(a => a.Timestamp)
            .Take(limit)
            .ToListAsync();
    }

    // ============ SETTINGS ============
    
    [HttpGet("settings")]
    public async Task<ActionResult<IEnumerable<SystemSetting>>> GetSettings()
    {
        return await _context.SystemSettings.ToListAsync();
    }

    [HttpGet("settings/{key}")]
    public async Task<ActionResult<SystemSetting>> GetSetting(string key)
    {
        var setting = await _context.SystemSettings
            .FirstOrDefaultAsync(s => s.Key == key);

        if (setting == null)
            return NotFound(new { message = "Setting not found" });

        return setting;
    }

    [HttpPut("settings")]
    public async Task<IActionResult> UpdateSettings([FromBody] List<SystemSetting> settings)
    {
        foreach (var setting in settings)
        {
            var existing = await _context.SystemSettings
                .FirstOrDefaultAsync(s => s.Key == setting.Key);

            if (existing != null)
            {
                existing.Value = setting.Value;
                existing.UpdatedAt = DateTime.UtcNow;
            }
            else
            {
                setting.UpdatedAt = DateTime.UtcNow;
                _context.SystemSettings.Add(setting);
            }
        }

        await _context.SaveChangesAsync();
        await LogActivity("settings_updated", "System settings updated", null, "SystemSetting", null);

        return NoContent();
    }

    // ============ STATS ============
    
    [HttpGet("stats")]
    public async Task<ActionResult<AdminStats>> GetStats()
    {
        var stats = new AdminStats
        {
            TotalUsers = await _context.Users.CountAsync(),
            ActiveUsers = await _context.Users.CountAsync(u => u.IsActive),
            TotalBills = await _context.Bills.CountAsync(),
            ProcessedBills = await _context.Bills.CountAsync(b => b.Status == "processed"),
            ProcessingBills = await _context.Bills.CountAsync(b => b.Status == "processing"),
            FailedBills = await _context.Bills.CountAsync(b => b.Status == "failed"),
            TotalTemplates = await _context.Templates.CountAsync(),
            PublishedTemplates = await _context.Templates.CountAsync(t => t.Status == "published"),
            PendingTemplates = await _context.Templates.CountAsync(t => t.Status == "pending_review"),
            UsersToday = await _context.Users.CountAsync(u => u.LastLoginDate >= DateTime.Today),
            BillsToday = await _context.Bills.CountAsync(b => b.CreatedAt >= DateTime.Today)
        };

        return stats;
    }

    // ============ HELPER METHODS ============
    
    private async Task LogActivity(string action, string description, int? userId, string? entityType, int? entityId)
    {
        var log = new ActivityLog
        {
            Action = action,
            Description = description,
            UserId = userId,
            EntityType = entityType,
            EntityId = entityId,
            Timestamp = DateTime.UtcNow,
            Icon = GetIconForAction(action)
        };

        _context.ActivityLogs.Add(log);
        await _context.SaveChangesAsync();
    }

    private string GetIconForAction(string action) => action switch
    {
        "user_created" => "person-plus-fill",
        "user_updated" => "person-check-fill",
        "user_deleted" => "person-x-fill",
        "bill_status_updated" => "file-earmark-check-fill",
        "template_approved" => "check-circle-fill",
        "template_rejected" => "x-circle-fill",
        "settings_updated" => "gear-fill",
        _ => "circle-fill"
    };
}

// DTO Classes
public class BillStatusUpdate
{
    public string Status { get; set; } = string.Empty;
}

public class TemplateApproval
{
    public bool Approved { get; set; }
    public string? Reason { get; set; }
}

public class AdminStats
{
    public int TotalUsers { get; set; }
    public int ActiveUsers { get; set; }
    public int TotalBills { get; set; }
    public int ProcessedBills { get; set; }
    public int ProcessingBills { get; set; }
    public int FailedBills { get; set; }
    public int TotalTemplates { get; set; }
    public int PublishedTemplates { get; set; }
    public int PendingTemplates { get; set; }
    public int UsersToday { get; set; }
    public int BillsToday { get; set; }
}
