using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using SignalRServerCore21Preview.Stadtinfo;
using System;

namespace SignalRServerCore21Preview
{
  public class Startup
  {
    public Startup(IConfiguration configuration)
    {
      Configuration = configuration;
    }

    public IConfiguration Configuration { get; }

    // This method gets called by the runtime. Use this method to add services to the container.
    public void ConfigureServices(IServiceCollection services)
    {
      services.AddCors(o => o.AddPolicy("CorsPolicy", builder =>
      {
        builder
                .AllowAnyMethod()
                .AllowAnyHeader()
                .AllowCredentials()
                
                .AllowAnyOrigin();
                //.WithOrigins("http://localhost:4200");
       }));


      services.AddMvc().SetCompatibilityVersion(CompatibilityVersion.Version_2_1);

      services.AddSignalR(options =>
      {
        options.KeepAliveInterval = TimeSpan.FromSeconds(20);
      });

      services.AddSingleton<IHostedService, Parkhausverwaltung>();
      services.AddSingleton<IHostedService, Tankstellenverwaltung>();

    }

    // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
    public void Configure(IApplicationBuilder app, Microsoft.AspNetCore.Hosting.IHostingEnvironment env)
    {
      if (env.IsDevelopment())
      {
        app.UseDeveloperExceptionPage();
      }
      else
      {
        app.UseHsts();
      }

      app.UseCors("CorsPolicy");
      app.UseStaticFiles();

      app.UseSignalR(routes =>
      {
        routes.MapHub<CityHub>("/city");
        routes.MapHub<ChatHub>("/chat");
      });


      app.UseHttpsRedirection();
      app.UseMvc();
    }
  }
}
