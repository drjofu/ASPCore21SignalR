using Microsoft.AspNetCore.SignalR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SignalRServerCore21Preview
{
  // Hub-Klasse
  public class ChatHub : Hub
  {
    // Diese Methode kann von Clients aufgerufen werden
    public async Task SendToAll(string from, string message)
    {
      // Diese Methode wird auf den Clients ausgeführt
      await Clients.All.SendAsync("ShowMessage", 
        $"{DateTime.Now.ToLongTimeString()} [{from}]: {message}");
    }
  }
}
