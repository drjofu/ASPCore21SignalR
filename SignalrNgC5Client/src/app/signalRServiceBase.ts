import { HubConnection } from "@aspnet/signalr";
import { Subscription, Subject, ReplaySubject, Observable } from 'rxjs/Rx';
import { Injectable } from "@angular/core";

export enum ConnectionState {
  Connecting = 1,
  Connected = 2,
  Disconnected = 4
}

@Injectable() export class SignalRServiceBase {

  // Verbindungsobjet zum Server
  public hubConnection: HubConnection;

  // Verbindungszustand als Observable
  public connectionState = new ReplaySubject<ConnectionState>(1);

  constructor(protected hubUrl: string) {

    // Verbindung einrichten
    this.hubConnection = new HubConnection(this.hubUrl);

    // Handler für das Schließen der Verbindung einrichten
    this.hubConnection.onclose(e => {
      console.log("SignalR: Abbruch: " + e);
      this.connectionState.next(ConnectionState.Disconnected);
    });

    // Verbindung aufbauen
    this.connect();
  }

  // Verbindung aufbauen
  public async connect() {

    // Status aktualisieren
    this.connectionState.next(ConnectionState.Connecting);

    try {
      // Verbindung zum Hub starten
      await this.hubConnection.start();

      // Status aktualisieren
      this.connectionState.next(ConnectionState.Connected);
      console.log('SignalR: Connection gestartet: ' + this.hubUrl);
    } catch (ex) {
      // Verbindungsaufbau ist fehlgeschlagen
      console.log('SignalR: Error while establishing connection :(');
      this.connectionState.next(ConnectionState.Disconnected);
    }
  }

  // Verknüpfen einer clientseitigen Hub-Callback-Methode mit einem Observer-Objekt
  public registerObserverSubject<T>(methodName: string, observer: Subject<T>) {
    this.hubConnection.on(methodName, p => observer.next(p));
  }

  // Wrapper für Send-Methode
  public send(methodName: string, ...args: any[]) {
    this.hubConnection.send(methodName, ...args);
  }

  // Verbindung einer Gruppe hinzufügen
  public joinGroup(groupname: string) {
    this.hubConnection.send("joinGroup", groupname);
  }

  // Verbindung aus einer Gruppe entfernen
  public leaveGroup(groupname: string) {
    this.hubConnection.send("leaveGroup", groupname);
  }

}