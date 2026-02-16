using Microsoft.AspNetCore.Mvc;
using admin.Data;

namespace admin.Controllers;

[ApiController]
[Route("api/[controller]")]
public class FileController : ControllerBase
{
    private readonly AppDbContext _context;
    private readonly ILogger<FileController> _logger;
    private readonly IWebHostEnvironment _environment;

    public FileController(
        AppDbContext context,
        ILogger<FileController> logger,
        IWebHostEnvironment environment)
    {
        _context = context;
        _logger = logger;
        _environment = environment;
    }

    [HttpPost("upload/bill")]
    [RequestSizeLimit(10_485_760)] // 10 MB
    public async Task<ActionResult<FileUploadResponse>> UploadBill(
        [FromForm] IFormFile file,
        [FromForm] int userId)
    {
        try
        {
            if (file == null || file.Length == 0)
                return BadRequest(new { message = "No file uploaded" });

            // Validate file type
            var allowedExtensions = new[] { ".pdf", ".jpg", ".jpeg", ".png" };
            var extension = Path.GetExtension(file.FileName).ToLowerInvariant();
            
            if (!allowedExtensions.Contains(extension))
                return BadRequest(new { message = "Invalid file type. Allowed: PDF, JPG, PNG" });

            // Validate file size (10 MB)
            if (file.Length > 10_485_760)
                return BadRequest(new { message = "File size exceeds 10 MB limit" });

            // Create uploads directory if it doesn't exist
            var uploadsPath = Path.Combine(_environment.ContentRootPath, "uploads", "bills");
            Directory.CreateDirectory(uploadsPath);

            // Generate unique filename
            var fileName = $"{Guid.NewGuid()}{extension}";
            var filePath = Path.Combine(uploadsPath, fileName);

            // Save file
            using (var stream = new FileStream(filePath, FileMode.Create))
            {
                await file.CopyToAsync(stream);
            }

            // Create bill record
            var bill = new Bill
            {
                FileName = file.FileName,
                FileUrl = $"/uploads/bills/{fileName}",
                Status = "uploaded",
                UserId = userId,
                CreatedAt = DateTime.UtcNow
            };

            _context.Bills.Add(bill);
            await _context.SaveChangesAsync();

            // Log activity
            var log = new ActivityLog
            {
                Action = "bill_uploaded",
                Description = $"Uploaded bill: {file.FileName}",
                UserId = userId,
                EntityType = "Bill",
                EntityId = bill.Id,
                Timestamp = DateTime.UtcNow,
                Icon = "file-earmark-arrow-up-fill"
            };
            _context.ActivityLogs.Add(log);
            await _context.SaveChangesAsync();

            return Ok(new FileUploadResponse
            {
                Success = true,
                FileName = fileName,
                OriginalFileName = file.FileName,
                FileUrl = bill.FileUrl,
                FileSize = file.Length,
                BillId = bill.Id,
                Message = "File uploaded successfully"
            });
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error uploading file");
            return StatusCode(500, new { message = "Error uploading file", error = ex.Message });
        }
    }

    [HttpPost("upload/template")]
    [RequestSizeLimit(5_242_880)] // 5 MB
    public async Task<ActionResult<FileUploadResponse>> UploadTemplate(
        [FromForm] IFormFile file,
        [FromForm] int creatorId)
    {
        try
        {
            if (file == null || file.Length == 0)
                return BadRequest(new { message = "No file uploaded" });

            // Validate file type (JSON only for templates)
            var extension = Path.GetExtension(file.FileName).ToLowerInvariant();
            
            if (extension != ".json")
                return BadRequest(new { message = "Invalid file type. Only JSON templates allowed" });

            // Validate file size (5 MB)
            if (file.Length > 5_242_880)
                return BadRequest(new { message = "File size exceeds 5 MB limit" });

            // Create uploads directory
            var uploadsPath = Path.Combine(_environment.ContentRootPath, "uploads", "templates");
            Directory.CreateDirectory(uploadsPath);

            // Generate unique filename
            var fileName = $"{Guid.NewGuid()}.json";
            var filePath = Path.Combine(uploadsPath, fileName);

            // Save file
            using (var stream = new FileStream(filePath, FileMode.Create))
            {
                await file.CopyToAsync(stream);
            }

            // Log activity
            var log = new ActivityLog
            {
                Action = "template_uploaded",
                Description = $"Uploaded template: {file.FileName}",
                UserId = creatorId,
                EntityType = "Template",
                EntityId = null,
                Timestamp = DateTime.UtcNow,
                Icon = "file-earmark-code-fill"
            };
            _context.ActivityLogs.Add(log);
            await _context.SaveChangesAsync();

            return Ok(new FileUploadResponse
            {
                Success = true,
                FileName = fileName,
                OriginalFileName = file.FileName,
                FileUrl = $"/uploads/templates/{fileName}",
                FileSize = file.Length,
                Message = "Template uploaded successfully"
            });
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error uploading template");
            return StatusCode(500, new { message = "Error uploading template", error = ex.Message });
        }
    }

    [HttpGet("download/{type}/{fileName}")]
    public IActionResult DownloadFile(string type, string fileName)
    {
        try
        {
            var uploadsPath = Path.Combine(_environment.ContentRootPath, "uploads", type);
            var filePath = Path.Combine(uploadsPath, fileName);

            if (!System.IO.File.Exists(filePath))
                return NotFound(new { message = "File not found" });

            var fileBytes = System.IO.File.ReadAllBytes(filePath);
            var contentType = GetContentType(fileName);

            return File(fileBytes, contentType, fileName);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error downloading file");
            return StatusCode(500, new { message = "Error downloading file" });
        }
    }

    [HttpDelete("{type}/{fileName}")]
    public IActionResult DeleteFile(string type, string fileName)
    {
        try
        {
            var uploadsPath = Path.Combine(_environment.ContentRootPath, "uploads", type);
            var filePath = Path.Combine(uploadsPath, fileName);

            if (!System.IO.File.Exists(filePath))
                return NotFound(new { message = "File not found" });

            System.IO.File.Delete(filePath);

            return Ok(new { message = "File deleted successfully" });
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error deleting file");
            return StatusCode(500, new { message = "Error deleting file" });
        }
    }

    private string GetContentType(string fileName)
    {
        var extension = Path.GetExtension(fileName).ToLowerInvariant();
        return extension switch
        {
            ".pdf" => "application/pdf",
            ".jpg" or ".jpeg" => "image/jpeg",
            ".png" => "image/png",
            ".json" => "application/json",
            _ => "application/octet-stream"
        };
    }
}

public class FileUploadResponse
{
    public bool Success { get; set; }
    public string FileName { get; set; } = string.Empty;
    public string OriginalFileName { get; set; } = string.Empty;
    public string FileUrl { get; set; } = string.Empty;
    public long FileSize { get; set; }
    public int? BillId { get; set; }
    public string Message { get; set; } = string.Empty;
}
