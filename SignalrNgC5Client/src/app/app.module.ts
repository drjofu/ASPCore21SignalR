import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { ParkhaeuserComponent } from './parkhaeuser/parkhaeuser.component';
import { BenzinpreiseComponent } from './benzinpreise/benzinpreise.component';

import { AppConfig } from './app.config';
import { SignalrCityService } from './signalr-city.service';
import { SignalrChatService } from './signalr-chat.service';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ParkhaeuserComponent,
    BenzinpreiseComponent
  ],
  imports: [FormsModule,
    BrowserModule,
    AppRoutingModule
  ],
  providers: [AppConfig, SignalrCityService, SignalrChatService],
  bootstrap: [AppComponent]
})
export class AppModule { }
