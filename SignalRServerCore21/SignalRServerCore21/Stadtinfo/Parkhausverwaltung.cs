using Microsoft.AspNetCore.SignalR;
using SignalRServerCore21Preview.HomeSurveillance;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SignalRServerCore21Preview.Stadtinfo
{
public class Parkhausverwaltung : PeriodicTaskHostedService
{
  // Hub-Objekt über DI
  private readonly IHubContext<CityHub> cityHub;

  // Liste der Parkhäuser
  private List<Parkhaus> parkhäuser;

  private Random rnd = new Random();

  // Hub wird über Dependency Injection bereit gestellt
  public Parkhausverwaltung(IHubContext<CityHub> cityHub)
  {
    this.interval = TimeSpan.FromMilliseconds(1000);
    this.cityHub = cityHub;

    parkhäuser = new List<Parkhaus>
    {
      new Parkhaus{ Name="P1", Plaetze=524, Freie=322},
      new Parkhaus{ Name="P2", Plaetze=222, Freie=35},
      new Parkhaus{ Name="P3", Plaetze=1521, Freie=666},
      new Parkhaus{ Name="P4", Plaetze=67, Freie=3}
    };
  }

  protected override void PeriodicTask(object state)
  {
    // Parkhausstatus ermitteln
    foreach (var ph in parkhäuser)
    {
      ph.Freie = Math.Max(0, Math.Min(ph.Plaetze, rnd.Next(-30, 30) + ph.Freie));
    }

    // Parkhausbelegungen über SignalR bekannt machen
    this.cityHub.Clients.Group("parkhaus").SendAsync("parkhausbelegung", parkhäuser);
  }
}
}
