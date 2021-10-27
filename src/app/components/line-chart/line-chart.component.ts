import { Component, OnInit, ViewChild } from '@angular/core';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { BaseChartDirective, Color, Label } from 'ng2-charts';
// import 'dist/chartjs-chart-financial/chartjs-chart-financial';
import 'chartjs-adapter-luxon';
import { DateTime } from 'luxon';

@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.scss']
})
export class LineChartComponent implements OnInit {
  @ViewChild(BaseChartDirective, { static: true }) chart: BaseChartDirective;

  barCount = 60;
  initialDateStr = '01 Apr 2017 00:00 Z';

  // public lineChartData: ChartDataSets[] = [
  //   { data: [-65, 59, -80, 81, -56, 55, 40], label: 'Series A', type: 'bar', },
  //   { data: [10, 2, 15, 6, 12, 22, 34], label: 'Series B', type: 'bar', }
  // ];

  public lineChartData: any = [
    {
      label: 'CHRT - Chart.js Corporation',
      type: 'candlestick',
      data: this.getRandomData(this.initialDateStr, this.barCount),
      barThickness: 10
    }
  ];

  public lineChartLabels: Label[] = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
  public lineChartOptions: ChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
  };
  public lineChartColors: Color[] = [
    {
      borderColor: 'black',
      backgroundColor: 'rgba(255,0,0,0.3)',
    },
  ];
  public lineChartLegend = true;
  // public lineChartType: any = 'candlestick';
  public lineChartPlugins = [];



  constructor() { }

  ngOnInit() {
  }

  addData(){
    // this.lineChartLabels.push('Next');
    // this.lineChartData[0].data?.push(Math.round(Math.random() * 200));
    // this.lineChartData[1].data?.push(Math.round(Math.random() * 50));
  }

  randomNumber(min: number, max: number): number {
    return Math.random() * (max - min) + min;
  }

  randomBar(date: DateTime, lastClose: number): { c: number; t: DateTime; h: number; l: number; o: number } {
    const open = this.randomNumber(lastClose * 0.95, lastClose * 1.05);
    const close = this.randomNumber(open * 0.95, open * 1.05);
    const high = this.randomNumber(Math.max(open, close), Math.max(open, close) * 1.1);
    const low = this.randomNumber(Math.min(open, close) * 0.9, Math.min(open, close));
    return {
      t: date,
      o: open,
      h: high,
      l: low,
      c: close
    };
  }

  getRandomData(dateStr: string, count: number): { c: number; t: DateTime; h: number; l: number; o: number }[] {
    let date = DateTime.fromRFC2822(dateStr);
    const data = [ this.randomBar(date, 30) ];
    while (data.length < count) {
      date = date.plus({ days: 1 });
      if (date.weekday <= 5) {
        data.push(this.randomBar(date, data[data.length - 1].c));
      }
    }
    return data;
  }

  update(): void {
    // candlestick vs ohlc
    // this.lineChartType = this.lineChartType === 'candlestick' ? 'ohlc' : 'candlestick';
  }


}
