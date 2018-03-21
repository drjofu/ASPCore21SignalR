import { Injectable } from '@angular/core';
import { SignalRServiceBase } from './signalRServiceBase';
import { AppConfig } from './app.config';
import { ReplaySubject } from 'rxjs';

@Injectable()
export class SignalrChatService extends SignalRServiceBase {

  // Empfangene Meldungen (die letzten 5 werden gespeichert)
  messages = new ReplaySubject<string>(5);

  constructor(private appConfig: AppConfig) {
    super(appConfig.chatHubUrl);

    // clientseitige Methode showMessage mit Observable verknüpfen
    super.registerObserverSubject("showMessage", this.messages)
  }
}
