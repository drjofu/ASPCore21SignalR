// import { Injectable } from '@angular/core';
// import { HubConnection } from '@aspnet/signalr';
// import { Subscription, Subject, ReplaySubject, Observable } from 'rxjs/Rx';
// import { Parkhaus } from './models';

// export enum ConnectionState {
//   Connecting = 1,
//   Connected = 2,
//   Reconnecting = 3,
//   Disconnected = 4
// }

// @Injectable()
// export class SignalRService {
//   private hubConnection: HubConnection;
//   connectionState: Observable<ConnectionState>;
//   public connectionStateSubject = new ReplaySubject<ConnectionState>(1);

//   parkhaeuser = new Subject<Parkhaus[]>();

//   public state: string = "connecting";

//   constructor() {
//     this.connectionState = this.connectionStateSubject.asObservable();

//     this.connect();
//   }

//   public async connect() {
//     // const baseUrl = "https://localhost:44387/"
//     const baseUrl = "https://localhost:5001/"
//     this.hubConnection = new HubConnection(baseUrl + 'signalr');

//     this.connectionStateSubject.next(ConnectionState.Connecting);

//     await this.hubConnection
//       .start()
//       .then(() => {
//         console.log('SignalR: Connection gestartet');
//         this.state = "connected";
//         this.connectionStateSubject.next(ConnectionState.Connected);
//       })
//       .catch(err => {
//         console.log('SignalR: Error while establishing connection :(');
//         this.connectionStateSubject.next(ConnectionState.Disconnected);
//       });

//     this.hubConnection.onclose(e => {
//       console.log("SignalR: Abbruch: " + e);
//       this.state = "disconnected";
//       this.connectionStateSubject.next(ConnectionState.Disconnected);
//     });

//     this.hubConnection.on('welcome', (p1) => {
//       console.log("Rec. Welcome", p1);
//     });

//     this.hubConnection.on("parkhausbelegung", (p)=>{
//       this.parkhaeuser.next(p);
//     });

//   }

//   public joinGroup(groupname:string) {
//     this.hubConnection.send("joinGroup", groupname);
//   }
//   public leaveGroup(groupname:string) {
//     this.hubConnection.send("leaveGroup", groupname);
//   }
// }
