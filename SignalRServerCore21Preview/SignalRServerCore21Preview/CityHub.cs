using Microsoft.AspNetCore.SignalR;
using Microsoft.Extensions.Hosting;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SignalRServerCore21Preview
{
  public class CityHub : Hub
  {
    private readonly IEnumerable<IHostedService> services;

    public CityHub(IEnumerable<IHostedService>services)
    {
      this.services = services;
    }

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
