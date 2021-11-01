import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ChartComponent } from './components/chart/chart.component';
import { Error404Component } from './components/error404/error404.component';
import * as Exporting from 'highcharts/modules/exporting';
import { ChartModule } from 'angular-highcharts';
import { ChartsModule } from 'ng2-charts';
import { StockChartComponent } from './components/stock-chart/stock-chart.component';
import { LineChartComponent } from './components/line-chart/line-chart.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HStockComponent } from './components/h-stock/h-stock.component';

@NgModule({
  declarations: [
    AppComponent,
    ChartComponent,
    Error404Component,
    StockChartComponent,
    LineChartComponent,
    HStockComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ChartModule,
    ChartsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
