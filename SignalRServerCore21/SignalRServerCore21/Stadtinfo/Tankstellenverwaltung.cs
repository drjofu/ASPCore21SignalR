using Microsoft.AspNetCore.SignalR;
using SignalRServerCore21Preview.HomeSurveillance;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SignalRServerCore21Preview.Stadtinfo
{
  public class Tankstellenverwaltung : PeriodicTaskHostedService
  {
    private readonly IHubContext<CityHub> cityHub;
    private List<Tankstelle> tankstellen;

    private Random rnd = new Random();

    // Hub wird über Dependency Injection bereit gestellt
    public Tankstellenverwaltung(IHubContext<CityHub> cityHub)
    {
      this.interval = TimeSpan.FromMilliseconds(2000);
      this.cityHub = cityHub;

      tankstellen = new List<Tankstelle>
      {
        new Tankstelle{Name="Aral", Diesel=1.33, Super=1.55},
        new Tankstelle{Name="Shell", Diesel=1.32, Super=1.53},
        new Tankstelle{Name="Esso", Diesel=1.35, Super=1.56}
      };
    }

    protected override void PeriodicTask(object state)
    {
      // aktuelle Tankstellenpreise ermitteln
      var diesel = Math.Round(Math.Max(0.95, Math.Min(1.5, rnd.Next(-20, 20) * 0.001 + tankstellen[0].Diesel)), 2);
      var super = Math.Round(Math.Max(1.2, Math.Min(1.8, rnd.Next(-20, 20) * 0.001 + tankstellen[0].Super)), 2);
      foreach (var t in tankstellen)
      {
        t.Diesel = Math.Round(diesel + (rnd.NextDouble() - 0.5) * 0.1, 2);
        t.Super = Math.Round(super + (rnd.NextDouble() - 0.5) * 0.1, 2);
      }

      // Aktuelle Preise über SignalR an registrierte Clients senden
      this.cityHub.Clients.Group("tankstellen").SendAsync("benzinpreise", tankstellen);
    }

  }
}
