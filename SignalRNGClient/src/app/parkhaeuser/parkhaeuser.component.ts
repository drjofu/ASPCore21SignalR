import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Parkhaus } from '../models';
import { SignalrCityService } from '../signalr-city.service';
import { ConnectionState } from '../signalRServiceBase';

@Component({
  selector: 'app-parkhaeuser',
  templateUrl: './parkhaeuser.component.html',
  styleUrls: ['./parkhaeuser.component.scss']
})
export class ParkhaeuserComponent implements OnInit, OnDestroy {

  private signalRSubscription: Subscription;
  public parkhaeuser: Parkhaus[];

  constructor(private signalRService: SignalrCityService) { }

  ngOnInit() {
    this.signalRService.connectionState.subscribe(cs => {
      if (cs == ConnectionState.Connected) {
        this.signalRSubscription = this.signalRService.parkhaeuser.subscribe(p => this.parkhaeuser = p);
        this.signalRService.joinGroup("parkhaus");
      }
    });
  }

  ngOnDestroy(): void {
    this.signalRService.leaveGroup("parkhaus");
    this.signalRSubscription.unsubscribe();
  }

}
