import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ReservationsComponent} from "./reservations/reservations.component";


const routes: Routes = [
  {path: '', redirectTo: '/list', pathMatch: 'full'},
  {path: 'list', component: ReservationsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
