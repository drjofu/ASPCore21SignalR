import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BenzinpreiseComponent } from './benzinpreise/benzinpreise.component';
import { HomeComponent } from './home/home.component';
import { ParkhaeuserComponent } from './parkhaeuser/parkhaeuser.component';
import { SignalrChatService } from './signalr-chat.service';
import { SignalrCityService } from './signalr-city.service';
import { AppConfig } from './app.config';

@NgModule({
  declarations: [
    AppComponent,
    BenzinpreiseComponent,
    HomeComponent,
    ParkhaeuserComponent
  ],
  imports: [FormsModule,
    BrowserModule,
    AppRoutingModule
  ],
  providers: [AppConfig, SignalrCityService, SignalrChatService],
  bootstrap: [AppComponent]
})
export class AppModule { }
