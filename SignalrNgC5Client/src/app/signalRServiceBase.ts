import { HubConnection } from "@aspnet/signalr";
import { Subscription, Subject, ReplaySubject, Observable } from 'rxjs/Rx';
import { Injectable } from "@angular/core";

export enum ConnectionState {
  Connecting = 1,
  Connected = 2,
  Disconnected = 4
}

@Injectable() export class SignalRServiceBase {

  public hubConnection: HubConnection;

  public connectionState = new ReplaySubject<ConnectionState>(1);

  constructor(protected hubUrl: string) {

    this.hubConnection = new HubConnection(this.hubUrl);

    this.hubConnection.onclose(e => {
      console.log("SignalR: Abbruch: " + e);
      this.connectionState.next(ConnectionState.Disconnected);
    });

    this.connect();
  }

  public async connect() {
    this.connectionState.next(ConnectionState.Connecting);

    try {
      await this.hubConnection.start();
      this.connectionState.next(ConnectionState.Connected);
      console.log('SignalR: Connection gestartet: ' + this.hubUrl);
    } catch (ex) {
      console.log('SignalR: Error while establishing connection :(');
      this.connectionState.next(ConnectionState.Disconnected);
    }
  }

  public registerObserverSubject<T>(methodName: string, observer: Subject<T>) {
    this.hubConnection.on(methodName, p => observer.next(p));
  }

  public send(methodName: string, ...args: any[]) {
    this.hubConnection.send(methodName, ...args);
  }

  public joinGroup(groupname: string) {
    this.hubConnection.send("joinGroup", groupname);
  }
  public leaveGroup(groupname: string) {
    this.hubConnection.send("leaveGroup", groupname);
  }

}