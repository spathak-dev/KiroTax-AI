using Microsoft.EntityFrameworkCore;

namespace admin.Data;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
    {
    }
    
    public DbSet<User> Users { get; set; }
    public DbSet<Bill> Bills { get; set; }
    public DbSet<Template> Templates { get; set; }
    public DbSet<ActivityLog> ActivityLogs { get; set; }
    public DbSet<SystemSetting> SystemSettings { get; set; }
    
    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);
        
        // Seed initial data
        modelBuilder.Entity<User>().HasData(
            new User 
            { 
                Id = 1, 
                Name = "Admin User", 
                Email = "admin@kirotax.ai", 
                Role = "admin",
                IsActive = true,
                CreatedAt = DateTime.UtcNow
            }
        );
        
        modelBuilder.Entity<SystemSetting>().HasData(
            new SystemSetting 
            { 
                Id = 1, 
                Key = "platform_name", 
                Value = "KiroTax AI",
                Description = "Platform name displayed in UI"
            },
            new SystemSetting 
            { 
                Id = 2, 
                Key = "max_file_size_mb", 
                Value = "10",
                Description = "Maximum file upload size in MB"
            }
        );
    }
}
