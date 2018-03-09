import { Injectable } from '@angular/core';
import { SignalRServiceBase } from './signalRServiceBase';
import { AppConfig } from './app.config';
import { ReplaySubject } from 'rxjs';

@Injectable()
export class SignalrChatService extends SignalRServiceBase {

  messages = new ReplaySubject<string>(5);
  constructor(private appConfig: AppConfig) {
    super(appConfig.chatHubUrl);
    super.registerObserverSubject("showMessage", this.messages)
  }


}
