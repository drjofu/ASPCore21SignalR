using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.SignalR.Client;
using Microsoft.Extensions.Logging;

namespace SignalRClientConsoleApp
{
  class Program
  {
    public static void Main(string[] args)
    {
      var connection = StartConnectionAsync().Result;

      string t = "";
      while (t != "x")
      {
        t = Console.ReadLine();
         connection.InvokeAsync("SendToAll", "Console", t);
      }

    }

    // Einrichten und Aufbauen der SignalR-Hub-Verbindung
    private static async Task<HubConnection> StartConnectionAsync()
    {
      string baseUrl = "https://localhost:5001/chat";

      Console.WriteLine("Weiter mit Return");
      Console.ReadLine();

      Console.WriteLine("Connecting to {0}", baseUrl);

      // Verbindung einrichten
      var connection = new HubConnectionBuilder()
          .WithUrl(baseUrl)
          //.WithConsoleLogger(LogLevel.Error)
          .Build();

      // Verbindung starten
      await connection.StartAsync();

      // Handler für Client-Methode
      connection.On<string>("ShowMessage", msg => Console.WriteLine("-> " + msg));

      // Serverseitige Methode aufrufen
      await connection.InvokeAsync("SendToAll", "Console", "ja hallo erstmal");
      return connection;

    }
  }
}
