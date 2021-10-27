import { Component, OnInit } from '@angular/core';
import { Chart, StockChart } from 'angular-highcharts';
import { Highcharts } from 'highcharts/modules/exporting';

import { webSocket } from "rxjs/webSocket";
const subject = webSocket("wss://api-pub.bitfinex.com/ws/2");

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss']
})
export class ChartComponent implements OnInit {
  chartData: any = [];
  ohlc: any = [];
  volume: any = [];

  lineChart: any;
  socket: any;

  chartOptions: any = {
    yAxis: [{
      labels: {
        align: 'left'
      },
      height: '80%',
      resize: {
        enabled: true
      }
    }, {
      labels: {
        align: 'left'
      },
      top: '80%',
      height: '20%',
      offset: 0
    }],
    tooltip: {
      shape: 'square',
      headerShape: 'callout',
      borderWidth: 0,
      shadow: false,
      // positioner: function (width: any, height: any, point: any) {
      //   var chart: any = this.chart, position;
      //   if (point.isHeader) {
      //     position = {
      //       x: Math.max(
      //         // Left side limit
      //         chart.plotLeft,
      //         Math.min(
      //           point.plotX + chart.plotLeft - width / 2,
      //           // Right side limit
      //           chart.chartWidth - width - chart.marginRight
      //         )
      //       ),
      //       y: point.plotY
      //     };
      //   } else {
      //     position = {
      //       x: point.series.chart.plotLeft,
      //       y: point.series.yAxis.top - chart.plotTop
      //     };
      //   }
      //   return position;
      // }
    },
    series: [{
      type: 'ohlc',
      id: 'aapl-ohlc',
      // name: 'AAPL Stock Price',
      data: []
    },
    {
      type: 'column',
      id: 'aapl-volume',
      // name: 'AAPL Volume',
      data: [],
      yAxis: 1
    }
    ],
    responsive: {
      rules: [{
        condition: {
          maxWidth: 800
        },
        chartOptions: {
          rangeSelector: {
            inputEnabled: false
          }
        }
      }]
    }
  }

  // stockChart = Highcharts.stockChart('container', this.chartOptions);

  constructor() { }

  ngOnInit(): void {
    console.log(this.chartOptions);
    // this.lineChart = new StockChart(this.chartOptions);

    subject.subscribe(
      (msg: any) => {
        console.log('message received: ', msg)

        if (msg.length === 2 && Array.isArray(msg[1])) {
          const data = msg[1];
          let ohlcTemp: any = [];
          let volumeTemp : any = [];

          console.log('data recieved: ', data);
          data.forEach(elem => {
            this.ohlc.push([elem[0], elem[1], elem[2], elem[3], elem[4]]);
            ohlcTemp.push([elem[0], elem[1], elem[2], elem[3], elem[4]]);

            this.volume.push([elem[0], elem[5]]);
            volumeTemp.push([elem[0], elem[5]]);
          });
          // console.log('data ohlc: ',  this.ohlc);

          if (data.length === 6) {
            // this.lineChart.series.setData(this.ohlc)
            // this.chartOptions.series[0].data = this.chartOptions.series[0].data.concat(this.ohlc);
            // console.log('chart options: ', this.chartOptions);
            // this.lineChart = new StockChart(this.chartOptions);

          } else if (data.length > 6) {
            this.chartOptions.series[0].data = this.ohlc;
            this.chartOptions.series[1].data = this.volume;
            console.log('chart options: ', this.chartOptions);
            this.lineChart = new StockChart(
              {
                chart: {
                  events: {
                    load: function () {

                      // set up the updating of the chart each second
                      var series1 = this.series[0];
                      series1.addPoint(ohlcTemp)

                      var series2 = this.series[1];
                      series2.addPoint(volumeTemp)
                      // setInterval(function () {
                      //   var x = (new Date()).getTime(), // current time
                      //     y = Math.round(Math.random() * 100);
                      //   series.addPoint([x, y], true, true);
                      // }, 1000);
                    }
                  }
                },

                time: {
                  useUTC: false
                },

                rangeSelector: {
                  buttons: [{
                    count: 1,
                    type: 'minute',
                    text: '1M'
                  }, {
                    count: 5,
                    type: 'minute',
                    text: '5M'
                  }, {
                    type: 'all',
                    text: 'All'
                  }],
                  inputEnabled: false,
                  selected: 0
                },

                title: {
                  text: 'Live random data'
                },

                exporting: {
                  enabled: false
                },

                series: [
                  {
                    type: 'ohlc',
                    id: 'aapl-ohlc',
                    // name: 'AAPL Stock Price',
                    data: this.ohlc
                  },
                ]

              }
            );
          }
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

}

