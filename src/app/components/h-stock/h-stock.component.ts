import { Component, OnInit } from '@angular/core';
import { Chart, StockChart } from 'angular-highcharts';
import { webSocket } from "rxjs/webSocket";
const subject = webSocket("wss://api-pub.bitfinex.com/ws/2");
let ohlc: any = [];
let volume: any = [];
let chartData: any = [];
let sChart: any;

let series1: any;
let series2: any;

@Component({
  selector: 'app-h-stock',
  templateUrl: './h-stock.component.html',
  styleUrls: ['./h-stock.component.scss']
})
export class HStockComponent implements OnInit {

  stockChart: any;
  // ohlc: any = [];
  // volume: any = [];

  showChart:Boolean = false;

  symbol: any = ["tBTCUSD", "tLTCUSD", "tLTCBTC", "tETHUSD", "tETHBTC", "tETCBTC", "tETCUSD", "tRRTUSD", "tZECUSD", "tZECBTC", "tXMRUSD", "tXMRBTC", "tDSHUSD", "tDSHBTC", "tBTCEUR", "tBTCJPY", "tXRPUSD", "tXRPBTC", "tIOTUSD", "tIOTBTC", "tIOTETH", "tEOSUSD", "tEOSBTC", "tEOSETH", "tSANUSD", "tSANBTC", "tSANETH", "tOMGUSD", "tOMGBTC", "tOMGETH", "tNEOUSD", "tNEOBTC", "tNEOETH", "tETPUSD", "tETPBTC", "tETPETH", "tQTMUSD", "tQTMBTC", "tEDOUSD", "tEDOBTC", "tEDOETH", "tBTGUSD", "tBTGBTC", "tDATUSD", "tDATBTC", "tQSHUSD", "tGNTUSD", "tSNTUSD", "tIOTEUR", "tBATUSD", "tBATBTC", "tBATETH", "tMNAUSD", "tMNABTC", "tFUNUSD", "tZRXUSD", "tZRXBTC", "tZRXETH", "tTRXUSD", "tTRXBTC", "tTRXETH", "tREPUSD", "tREPBTC", "tBTCGBP", "tETHEUR", "tETHJPY", "tETHGBP", "tNEOEUR", "tNEOJPY", "tNEOGBP", "tEOSEUR", "tEOSJPY", "tEOSGBP", "tIOTJPY", "tIOTGBP", "tREQUSD", "tLRCUSD", "tWAXUSD", "tDAIUSD", "tDAIBTC", "tDAIETH", "tBFTUSD", "tODEUSD", "tANTUSD", "tANTBTC", "tANTETH", "tSTJUSD", "tXLMUSD", "tXLMBTC", "tXLMETH", "tXVGUSD", "tMKRUSD", "tKNCUSD", "tKNCBTC", "tLYMUSD", "tUTKUSD", "tVEEUSD", "tORSUSD", "tZCNUSD", "tESSUSD"];

  tempChartData1: any = [];
  tempChartData2: any = [];
  constructor() {
    this.drawChart();
  }

  ngOnInit(): void {
    subject.subscribe(
      (msg: any) => {
        console.log('message received: ', msg)
        if (msg.length === 2 && Array.isArray(msg[1])) {
          const data = msg[1];
          // console.log('data recieved: ', data);

          if (data.length === 6) {
            console.log('----add new point in chart-----');
            series1.addPoint([data[0], data[1], data[2], data[3], data[4]]);
            series2.addPoint([data[0], data[5]]);
            // console.log('updated series 1: ', series1);
          } else if (data.length > 6) {
            chartData = data;
            // chartData.forEach((d: any) => {
            //   ohlc.push([
            //     d[0], // the date
            //     d[1], // open
            //     d[2], // high
            //     d[3], // low
            //     d[4], // close
            //     d[5] // close
            //   ]);

            //   volume.push([
            //     d[0], // the date
            //     d[5] // the volume
            //   ]);
            // });

            // console.log('ohlc data: ', ohlc);
            // console.log('volume data: ', volume);

            // this.drawChart();

            this.showChart = true;
          }
        }

      },
      err => console.log(err),
      () => console.log('complete')
    );
  }

  drawChart() {
    this.stockChart = new StockChart(
      {
        chart: {
          events: {
            load: function () {
              // set up the updating of the chart each second
              // series1 = null;
              series1 = this.series[0];

              // console.log('Series 1 ---->: ', series1);
              // series2 = null;
              series2 = this.series[1];

              // let d: any

              // setInterval(function () {
              //   d = null
              //   d = new Date().getTime();
              //   const searies1Data: any = [d, Math.round(Math.random() * 100), Math.round(Math.random() * 100), Math.round(Math.random() * 100), Math.round(Math.random() * 100)]
              //   console.log('Series 1 data: ', searies1Data);

              //   const searies2Data: any = [searies1Data[0], Math.round(Math.random() * (900000000 - 100000000) + 100000000)]
              //   console.log('Series 2 data: ', searies2Data);

              //   series1.addPoint(searies1Data);
              //   console.log('updated series 1: ', series1);
              //   series2.addPoint(searies2Data);
              //   console.log('updated series 2: ', series2);
              // }, 3000);
            }
          }
        },
        time: {
          useUTC: false
        },
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
        // tooltip: {
        //   shape: 'square',
        //   headerShape: 'callout',
        //   borderWidth: 0,
        //   shadow: false,
        // },
        series: [{
          type: 'ohlc',
          id: 'ohlc',
          name: 'Stock Price',
          data: ohlc,
        }, {
          type: 'column',
          id: 'volume',
          name: 'Volume',
          data: volume,
          yAxis: 1
        }],
        responsive: {
          rules: [{
            condition: {
              // maxWidth: 800
            },
            chartOptions: {
              rangeSelector: {
                inputEnabled: true
              }
            }
          }]
        }
      }
    );
  }

  getChartData(event: any) {
    this.showChart = false;
    const curr = event.target.value;
    console.log('curr--> ', curr);
    if (curr.length > 0) {
      this.stockChart = null;
      series1 = null;
      series2 = null;
      ohlc = null;
      volume = null;
      chartData = null;
      this.drawChart();

      let msg = {
        event: 'subscribe',
        channel: 'candles',
        key: `trade:1m:${curr}`
      }

      subject.next(msg);
      // subject.complete();
      // subject.error({ code: 4000, reason: 'socket error!' });
    }
  }

  addNewPoint() {
    const d = new Date().getTime();
    const searies1Data: any = [d, Math.round(Math.random() * 100), Math.round(Math.random() * 100), Math.round(Math.random() * 100), Math.round(Math.random() * 100)]
    console.log('Series 1 data: ', searies1Data);

    const searies2Data: any = [searies1Data[0], Math.round(Math.random() * (900000000 - 100000000) + 100000000)]
    console.log('Series 2 data: ', searies2Data);

    series1.addPoint(searies1Data, true);
    console.log('updated series 1: ', series1);
    series2.addPoint(searies2Data, true);
    console.log('updated series 2: ', series2);
  }

}
