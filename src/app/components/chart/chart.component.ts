import { Component, OnInit } from '@angular/core';
import * as io from 'socket.io-client';
import { Chart } from 'angular-highcharts';
import { webSocket } from "rxjs/webSocket";
import * as Rx from "rxjs";
const subject = webSocket("wss://api-pub.bitfinex.com/ws/2");

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss']
})
export class ChartComponent implements OnInit {
  chartData: any = [];

  lineChart: any;

  socket: any;
  chartOptions: any = {
    chart: {
      type: 'areaspline'
    },
    title: {
      text: ''
    },
    // legend: {
    //   layout: 'vertical',
    //   align: 'left',
    //   verticalAlign: 'top',
    //   x: 150,
    //   y: 100,
    //   floating: true,
    //   borderWidth: 1,
    //   backgroundColor: '#FFFFFF'
    // },
    xAxis: {
      categories: [
        '00:00',
        '01:00',
        '02:00',
        '03:00',
        '04:00',
        '05:00',
        '06:00',
        '07:00',
        '08:00',
        '09:00',
        '10:00',
        '11:00',
        '12:00',
      ],
      plotBands: [{
        from: 4.5,
        to: 6.5,
        color: 'rgba(68, 170, 213, .2)'
      }]
    },
    yAxis: {
      title: {
        text: ''
      }
    },
    tooltip: {
      shared: true,
      valueSuffix: ' units'
    },
    credits: {
      enabled: false
    },
    plotOptions: {
      areaspline: {
        fillOpacity: 0.5
      }
    },
    series: [
      {
        name: 'John',
        data: []
      }
    ]
  }


  constructor() { }

  ngOnInit(): void {
    console.log(this.chartOptions);
    this.lineChart = new Chart(this.chartOptions);

    subject.subscribe(
      (msg: any) => {
        // console.log('message received: ', msg)

        if(msg.length === 2 && Array.isArray(msg[1])){
          this.chartData = msg[1];
          console.log('data recieved: ', this.chartData);
          console.log('x axis: ', this.chartData.map((o:any)=> o[1]));

          this.chartOptions.xAxis.categories = this.chartData.map((o:any)=>o[1]);
          this.chartOptions.series[0].data = this.chartData.map((o:any)=>o[2]);

          console.log('chart options: ', this.chartOptions);

          this.lineChart = new Chart(this.chartOptions);

        }else if(msg.length === 3 && Array.isArray(msg[2])){
          console.log('message----->: ', msg[2]);
          this.chartData = this.chartData.push(msg[2]);
          console.log('data recieved: ', this.chartData);

          console.log('data recieved: ', this.chartData);
          console.log('x axis: ', this.chartData.map((o:any)=> o[1]));

          this.chartOptions.xAxis.categories = this.chartData.map((o:any)=>o[1]);
          this.chartOptions.series[0].data = this.chartData.map((o:any)=>o[2]);

          console.log('chart options: ', this.chartOptions);

          this.lineChart = new Chart(this.chartOptions);
        }

      },
      err => console.log(err),
      () => console.log('complete')
    );

    this.getChartData();
  }

  unsubscribeChannel(channelId: string) {
    const req = {
      event: 'unsubscribe',
      chanId: channelId
    }
    subject.next(req);
  }

  getChartData() {
    let msg = {
      event: 'subscribe',
      channel: 'trades',
      symbol: 'tBTCUSD'
    }

    // let msg = JSON.stringify({
    //   event: "subscribed",
    //   channel: "trades",
    //   chanId: 19111,
    //   symbol: "tBTCUSD",
    //   pair: "BTCUSD"
    // })

    subject.next(msg);
    // subject.complete();
    // subject.error({ code: 4000, reason: 'socket error!' });
  }

}

