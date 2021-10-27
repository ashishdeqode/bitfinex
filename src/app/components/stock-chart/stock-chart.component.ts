import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
declare var google: any;

import { webSocket } from "rxjs/webSocket";
const subject = webSocket("wss://api-pub.bitfinex.com/ws/2");

@Component({
  selector: 'app-stock-chart',
  templateUrl: './stock-chart.component.html',
  styleUrls: ['./stock-chart.component.scss']
})
export class StockChartComponent implements OnInit, AfterViewInit {
  @ViewChild('areaChart') areaChart: ElementRef;
  ohlc: any = [];
  volume: any = [];

  chartData: any;
  chartOptions: any = {
    title : 'Monthly Coffee Production by Country',
    vAxis: {title: 'Cups'},
    hAxis: {title: 'Month'},
    // seriesType: 'bars',
    legend: 'none',
    explorer: {

    }
  };
  chart: any;
  drawChart = () => {
    // var data = new google.visualization.DataTable();
    this.chartData = new google.visualization.DataTable();
    this.chartData.addColumn('number', 'Date');
    this.chartData.addColumn('number', 'A');
    this.chartData.addColumn('number', 'B');
    this.chartData.addColumn('number', 'C');
    this.chartData.addColumn('number', 'D');
    // this.chartData.addColumn('number', 'Volume');
    // this.chartData.addRows([
    //   ['a', 20, 28, 38, 45],
    //   ['b', 31, 38, 55, 66],
    //   ['c', 50, 55, 77, 80],
    //   ['d', 77, 77, 66, 50],
    //   ['e', 68, 66, 22, 15]
    //   // Treat first row as data as well.
    // ], true)

    this.chart = new google.visualization.CandlestickChart(this.areaChart.nativeElement);
    this.chart.draw(this.chartData, this.chartOptions);

  }
  constructor() { }

  ngOnInit(): void {
    subject.subscribe(
      (msg: any) => {
        console.log('message received: ', msg)

        if (msg.length === 2 && Array.isArray(msg[1])) {
          const data = msg[1];

          if (data.length === 6) {
            console.log('data ohlc: ', data);
            this.chartData.addRow([data[0], data[1], data[2], data[3], data[4]]);
            this.chart.draw(this.chartData, this.chartOptions);
          } else if (data.length > 6) {
            let ohlcTemp: any = [];
            let volumeTemp: any = [];

            console.log('data recieved: ', data);
            data.forEach(elem => {
              this.ohlc.push([elem[0], elem[1], elem[2], elem[3], elem[4]]);
              ohlcTemp.push([elem[0], elem[1], elem[2], elem[3], elem[4]]);

              this.volume.push([elem[0], elem[5]]);
              volumeTemp.push([elem[0], elem[5]]);
            });

            this.chartData.addRows(this.ohlc);
            this.chart.draw(this.chartData, this.chartOptions);
          }
        }

      },
      err => console.log(err),
      () => console.log('complete')
    );

    this.getChartData();
  }

  ngAfterViewInit(): void {
    google.charts.load('current', { packages: ['corechart'] });
    google.charts.setOnLoadCallback(this.drawChart);
  }

  getChartData() {
    let msg = {
      event: 'subscribe',
      channel: 'candles',
      key: 'trade:1m:tBTCUSD'
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

  addData() {
    // this.chartData = new google.visualization.DataTable();
    // this.chartData.addColumn('string','O');
    // this.chartData.addColumn('number','A');
    // this.chartData.addColumn('number','B');
    // this.chartData.addColumn('number','C');
    // this.chartData.addColumn('number','D');
    this.chartData.addRow([10, 20, 28, 38, 45]);
    var options = {
      legend: 'none'
    };
    this.chart.draw(this.chartData, options);
  }

}

