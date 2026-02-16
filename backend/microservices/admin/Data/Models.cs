using System.ComponentModel.DataAnnotations;

namespace admin.Data;

public class User
{
    public int Id { get; set; }
    
    [Required]
    [StringLength(100)]
    public string Name { get; set; } = string.Empty;
    
    [Required]
    [EmailAddress]
    public string Email { get; set; } = string.Empty;
    
    [Required]
    public string Role { get; set; } = "client"; // admin, ca, auditor, client
    
    public string? Company { get; set; }
    
    public bool IsActive { get; set; } = true;
    
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    
    public DateTime? LastLoginDate { get; set; }
}

public class Bill
{
    public int Id { get; set; }
    
    [Required]
    public string FileName { get; set; } = string.Empty;
    
    public string? FileUrl { get; set; }
    
    [Required]
    public string Status { get; set; } = "uploaded"; // uploaded, processing, processed, failed
    
    public int UserId { get; set; }
    
    public string? InvoiceNumber { get; set; }
    
    public DateTime? InvoiceDate { get; set; }
    
    public string? VendorName { get; set; }
    
    public decimal? GrandTotal { get; set; }
    
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    
    public DateTime? ProcessedAt { get; set; }
}

public class Template
{
    public int Id { get; set; }
    
    [Required]
    public string Name { get; set; } = string.Empty;
    
    public string? Description { get; set; }
    
    [Required]
    public string Category { get; set; } = "general";
    
    public decimal Price { get; set; } = 0;
    
    public string Status { get; set; } = "pending_review"; // pending_review, published, rejected
    
    public int CreatorId { get; set; }
    
    public int DownloadCount { get; set; } = 0;
    
    public double Rating { get; set; } = 0;
    
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
}

public class ActivityLog
{
    public int Id { get; set; }
    
    [Required]
    public string Action { get; set; } = string.Empty;
    
    public string? Description { get; set; }
    
    public int? UserId { get; set; }
    
    public string? EntityType { get; set; }
    
    public int? EntityId { get; set; }
    
    public DateTime Timestamp { get; set; } = DateTime.UtcNow;
    
    public string Icon { get; set; } = "circle-fill";
}

public class SystemSetting
{
    public int Id { get; set; }
    
    [Required]
    public string Key { get; set; } = string.Empty;
    
    public string? Value { get; set; }
    
    public string? Description { get; set; }
    
    public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;
}
