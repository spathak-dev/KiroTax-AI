using Microsoft.AspNetCore.SignalR;

namespace admin.Hubs;

public class AdminHub : Hub
{
    private readonly ILogger<AdminHub> _logger;

    public AdminHub(ILogger<AdminHub> logger)
    {
        _logger = logger;
    }

    public override async Task OnConnectedAsync()
    {
        _logger.LogInformation($"Client connected: {Context.ConnectionId}");
        await base.OnConnectedAsync();
    }

    public override async Task OnDisconnectedAsync(Exception? exception)
    {
        _logger.LogInformation($"Client disconnected: {Context.ConnectionId}");
        await base.OnDisconnectedAsync(exception);
    }

    // Send notification to all connected clients
    public async Task SendNotification(string message, string type = "info")
    {
        await Clients.All.SendAsync("ReceiveNotification", message, type);
    }

    // Send stats update to all clients
    public async Task SendStatsUpdate(object stats)
    {
        await Clients.All.SendAsync("ReceiveStatsUpdate", stats);
    }

    // Send activity log update
    public async Task SendActivityUpdate(object activity)
    {
        await Clients.All.SendAsync("ReceiveActivityUpdate", activity);
    }

    // Send user update notification
    public async Task SendUserUpdate(string action, object user)
    {
        await Clients.All.SendAsync("ReceiveUserUpdate", action, user);
    }

    // Send bill update notification
    public async Task SendBillUpdate(string action, object bill)
    {
        await Clients.All.SendAsync("ReceiveBillUpdate", action, bill);
    }

    // Send template update notification
    public async Task SendTemplateUpdate(string action, object template)
    {
        await Clients.All.SendAsync("ReceiveTemplateUpdate", action, template);
    }
}
