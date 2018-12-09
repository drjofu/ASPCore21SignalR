import { Component } from '@angular/core';
import { SignalrCityService } from './signalr-city.service';
import { SignalrChatService } from './signalr-chat.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(public cityService: SignalrCityService, public chatService: SignalrChatService) {
   }
}