import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {IMovie} from "../model/IMovie.interface";
import {IReservation} from "../model/IReservation.interface";

@Injectable()
export class ReservationService {
/*TODO: itt inkább ne írd ki a / jelet a 3000 után, mert később, mikor írod az URL-t, inkább oda írd,
   jobban olvasható: `${this.mockApiUrl}reservations` helyett `${this.mockApiUrl}/reservations`*/
  //private mockApiUrl = 'http://localhost:3000/';
  private mockApiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  getMovies() {
    /*TODO: ide is interpolationt használnék*/
    return this.http.get<IMovie[]>(this.mockApiUrl + '/movies');
  }
  saveReservation(reservation: IReservation) {
    /*TODO: ilyen esetekben javasolnám a string interpolation-t*/
    return this.http.post(`${this.mockApiUrl}/reservations`, reservation);
    // return this.http.post(this.mockApiUrl + 'reservations', reservation);
  }
  getReservations() {
    /*TODO: látom, hogy próbálkoztál, de nem így kell használni. Ennek semmi értelme. Inkább ennek is olvass utána,
    *  ha nem vagy benne biztos.
    * használat: `${változó} string, amit utána akarsz írni`
    * nem kell bele vessző, idézőjel és plusz.*/
    return this.http.get<IReservation[]>(`${this.mockApiUrl}/reservations`);
    // return this.http.get<IReservation[]>(`${this.mockApiUrl + 'reservations/'}`);
  }

  /*TODO: ki kellene javítani a string interpolations*/
  getReservationById(id: string) {
    return this.http.get<IReservation>(`${this.mockApiUrl + '/reservations/'}${id}`);
  }
  updateReservation(reservation: IReservation, id: string) {
    return this.http.put<IReservation>(`${this.mockApiUrl + '/reservations/'}${id}`, reservation);
  }
  deleteReservation(id: number) {
    return this.http.delete<number>(`${this.mockApiUrl + '/reservations/'}${id}`);
  }
}
