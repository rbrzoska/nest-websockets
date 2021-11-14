import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Socket, Server } from 'socket.io';
import { BehaviorSubject } from 'rxjs';

@WebSocketGateway()
export class FlightsGateway {
  private clientsSubj = new BehaviorSubject<string[]>([]);
  get connectedClients(): string[] {
    return this.clientsSubj.value;
  }

  @WebSocketServer()
  server: Server;

  poller: any;

  @SubscribeMessage('message')
  handleMessage(client: Socket, payload: any): string {
    return 'Hello world!';
  }

  handleConnection(socket: Socket): void {
    const socketId = socket.id;
    console.log(`New connecting... socket id:`, socketId);
    this.clientsSubj.next([...this.clientsSubj.value, socketId]);

    console.log(this.connectedClients);
    if (this.connectedClients.length === 1) {
      let counter = 0;
      this.poller = setInterval((x) => {
        counter++;
        console.log('New number: ' + counter);
        this.server.emit('update', 'New number: ' + counter);
      }, 1000);
    }
  }

  handleDisconnect(socket: Socket): void {
    const socketId = socket.id;
    console.log(`Disconnection... socket id:`, socketId);
    this.clientsSubj.next([
      ...this.clientsSubj.value.filter((v) => v !== socketId),
    ]);
    if (this.connectedClients.length === 0) {
      clearInterval(this.poller);
    }
  }
}
