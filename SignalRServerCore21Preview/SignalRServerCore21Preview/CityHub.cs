using Microsoft.AspNetCore.SignalR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SignalRServerCore21Preview
{
  public class CityHub : Hub
  {
    public async Task JoinGroup(string groupname)
    {
      await this.Groups.AddAsync(this.Context.ConnectionId, groupname);
    }

    public async Task LeaveGroup(string groupname)
    {
      await this.Groups.RemoveAsync(this.Context.ConnectionId, groupname);
    }

  }
}
