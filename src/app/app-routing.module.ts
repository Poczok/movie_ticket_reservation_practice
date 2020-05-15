import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {MovieListComponent} from "./components/movie-list/movie-list.component";
import {ReservationComponent} from "./components/reservation/reservation.component";
import {ReservationListComponent} from "./components/reservation-list/reservation-list.component";


const routes: Routes = [
  {path: '', redirectTo: '/movie-list', pathMatch: 'full'},
  {path: 'movie-list', component: MovieListComponent},
  {path: 'reservation', component: ReservationComponent},
  {path: 'reservation/:id', component: ReservationComponent},
  {path: 'reservation-list', component: ReservationListComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
