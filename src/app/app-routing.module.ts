import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { TasksComponent } from './tasks/tasks.component';
import { CallendarComponent } from './callendar/callendar.component';
const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'callendars',
    component: CallendarComponent
  },
  {
    path: 'callendars/:id',
    component: TasksComponent
  }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
