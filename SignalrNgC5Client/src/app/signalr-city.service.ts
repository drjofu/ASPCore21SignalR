import { Injectable } from '@angular/core';
import { SignalRServiceBase } from './signalRServiceBase';
import { AppConfig } from './app.config';
import { Subject } from 'rxjs';
import { Parkhaus, Tankstelle } from './models';

@Injectable()
export class SignalrCityService extends SignalRServiceBase {

  
  parkhaeuser = new Subject<Parkhaus[]>();
  tankstellen = new Subject<Tankstelle[]>();

  constructor(private appConfig:AppConfig) {
    super(appConfig.cityHubUrl);
    super.registerObserverSubject<Parkhaus[]>("parkhausbelegung", this.parkhaeuser);
    super.registerObserverSubject<Tankstelle[]>("benzinpreise", this.tankstellen);
   }


}
