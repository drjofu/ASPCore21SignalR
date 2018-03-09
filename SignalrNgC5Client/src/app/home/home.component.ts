import { Component, OnInit, OnDestroy } from '@angular/core';
import { SignalrChatService } from '../signalr-chat.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {

  public messages = new Array<string>(0);
  public messageToSend: string = "Hallo";
  public name: string = "Osterhase";
  private subscription:Subscription;

  constructor(private signalRService: SignalrChatService) {
    this.subscription =
      signalRService.messages.subscribe(m =>
      this.messages.unshift(m));
  }

  ngOnInit() {
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  sendMessage() {
    this.signalRService.send("sendToAll", this.name, this.messageToSend);
  }

}
