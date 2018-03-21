import { Component, OnInit, OnDestroy } from '@angular/core';
import { SignalrChatService } from '../signalr-chat.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {

  // Liste der vergangenen Messages
  public messages = new Array<string>(0);

  // Zu sendende Meldung
  public messageToSend: string = "Hallo";

  // Benutzername
  public name: string = "Osterhase";

  // Referenz der Subscription für späteres Unsubscribe
  private subscription: Subscription;

  constructor(private signalRService: SignalrChatService) { }

  ngOnInit() {
    // Observable auf neue Meldungen überwachen
    this.subscription =
      this.signalRService.messages.subscribe(m =>
        // Neue Meldung am Beginn der Liste einfügen
        this.messages.unshift(m));
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  sendMessage() {
    this.signalRService.send("sendToAll", this.name, this.messageToSend);
  }

}
