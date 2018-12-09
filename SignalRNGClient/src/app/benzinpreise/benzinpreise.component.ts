import { Component, OnInit, OnDestroy } from '@angular/core';
import { SignalrCityService } from '../signalr-city.service';
import { ConnectionState } from '../signalRServiceBase';
import { Subscription } from 'rxjs';
import { Tankstelle } from '../models';

@Component({
  selector: 'app-benzinpreise',
  templateUrl: './benzinpreise.component.html',
  styleUrls: ['./benzinpreise.component.scss']
})
export class BenzinpreiseComponent implements OnInit, OnDestroy {

  private signalRSubscription: Subscription;
  public tankstellen: Tankstelle[];

  constructor(private signalRService: SignalrCityService) { }

  ngOnInit() {
    this.signalRService.connectionState.subscribe(cs => {
      if (cs == ConnectionState.Connected) {
        this.signalRSubscription = this.signalRService.tankstellen.subscribe(t => 
          this.tankstellen = t);
        this.signalRService.joinGroup("tankstellen");
      }
    });
  }

  ngOnDestroy(): void {
    this.signalRService.leaveGroup("tankstellen");
    this.signalRSubscription.unsubscribe();
  }

}
