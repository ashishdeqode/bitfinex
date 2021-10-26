import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChartComponent } from './components/chart/chart.component';
import { Error404Component } from './components/error404/error404.component';

const routes: Routes = [
  {
    path: '',
    component: ChartComponent
  },
  {
    path: 'chart',
    component: ChartComponent
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
