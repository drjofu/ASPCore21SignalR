using Microsoft.AspNetCore.SignalR;
using Microsoft.Extensions.Hosting;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace SignalRServerCore21Preview.HomeSurveillance
{
  public abstract class PeriodicTaskHostedService : IHostedService
  {
    private Timer timer;
    protected TimeSpan interval;

    protected abstract void PeriodicTask(object state);

    #region Implementierung IHostedService

    public virtual Task StartAsync(CancellationToken cancellationToken)
    {
      timer = new Timer(PeriodicTask, null, TimeSpan.Zero, interval);
      return Task.CompletedTask;
    }

    public virtual Task StopAsync(CancellationToken cancellationToken)
    {
      Console.Beep(4000, 400);

      timer?.Change(Timeout.Infinite, 0);
      return Task.CompletedTask;
    }

    #endregion
  }
}
