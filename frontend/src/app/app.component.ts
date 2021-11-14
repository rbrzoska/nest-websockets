import { Component } from '@angular/core';
import { Socket } from 'ngx-socket-io';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'frontend';
  data: any;

  constructor(private socket: Socket) {
    this.socket.fromEvent('update').subscribe(d => this.data = d);
  }
}
