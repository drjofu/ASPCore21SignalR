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

    private static async Task<HubConnection> StartConnectionAsync()
    {
      string baseUrl = "https://localhost:5001/chat";

      Console.WriteLine("Weiter mit Return");
      Console.ReadLine();

      Console.WriteLine("Connecting to {0}", baseUrl);
      var connection = new HubConnectionBuilder()
          .WithUrl(baseUrl)
          .WithConsoleLogger(LogLevel.Error)
          .Build();

      await connection.StartAsync();

      connection.On<string>("ShowMessage", msg => Console.WriteLine("-> " + msg));
      await connection.InvokeAsync("SendToAll", "Console", "ja hallo erstmal");
      return connection;

    }
  }
}
