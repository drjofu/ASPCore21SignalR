using Microsoft.AspNetCore.SignalR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SignalRServerCore21Preview
{
  public class ChatHub : Hub
  {
    public async Task SendToAll(string from, string message)
    {
      await Clients.All.SendAsync("ShowMessage", 
        $"{DateTime.Now.ToLongTimeString()} [{from}]: {message}");
    }
  }
}
