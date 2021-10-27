import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChartComponent } from './components/chart/chart.component';
import { Error404Component } from './components/error404/error404.component';
import { LineChartComponent } from './components/line-chart/line-chart.component';
import { StockChartComponent } from './components/stock-chart/stock-chart.component';

const routes: Routes = [
  {
    path: '',
    component: ChartComponent
  },
  {
    path: 'chart',
    component: LineChartComponent
  },
  {
    path: 'stock',
    component: StockChartComponent
  },
  {
    path: '**',
    component: Error404Component
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
