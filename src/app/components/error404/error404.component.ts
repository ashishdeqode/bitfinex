import { Component, OnInit } from '@angular/core';
import * as io from 'socket.io-client'

@Component({
  selector: 'app-error404',
  templateUrl: './error404.component.html',
  styleUrls: ['./error404.component.scss']
})
export class Error404Component implements OnInit {
  socket: any;

  constructor() { }

  ngOnInit(): void {
    this.socket = io.connect('wss://api-pub.bitfinex.com/ws/2');
    console.log(this.socket);

    // let msg = JSON.stringify({
    //   event: 'subscribe',
    //   channel: 'ticker',
    //   symbol: 'tBTCUSD'
    // })

    this.socket.on('message', (res: any)=>{
      console.log('response: ', res);
    });
  }

}
