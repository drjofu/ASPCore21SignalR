using Microsoft.AspNetCore.SignalR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SignalRServerCore21Preview
{
  public class ChatHub : Hub
  {
    static int n = 0;

    public ChatHub()
    {
    }

    public override Task OnConnectedAsync()
    {
      n++;
      return base.OnConnectedAsync();
    }

    public override Task OnDisconnectedAsync(Exception exception)
    {
      n--;
      return base.OnDisconnectedAsync(exception);
    }

    public async Task EnterRoom()
    {
      await this.Groups.AddAsync(this.Context.ConnectionId, "A1");
      await this.Clients.Group("A1").SendAsync("Welcome", n.ToString());
    }

    public async Task SendToAll(string from, string message)
    {
      await Clients.All.SendAsync("ShowMessage", $"{DateTime.Now.ToLongTimeString()} [{from}]: {message}");
    }
  }
}
