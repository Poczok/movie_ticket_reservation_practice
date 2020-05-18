import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {IMovie} from "../model/IMovie.interface";
import {IReservation} from "../model/IReservation.interface";

@Injectable()
export class ReservationService {

  private mockApiUrl = 'http://localhost:3000/';

  constructor(private http: HttpClient) { }

  getMovies() {
    return this.http.get<IMovie[]>(this.mockApiUrl + 'movies');
  }
  saveReservation(reservation: IReservation) {
    return this.http.post(this.mockApiUrl + 'reservations', reservation);
  }
  getReservations() {
    return this.http.get<IReservation[]>(`${this.mockApiUrl + 'reservations/'}`);
  }
  getReservationById(id: string) {
    return this.http.get<IReservation>(`${this.mockApiUrl + 'reservations/'}${id}`);
  }
  updateReservation(reservation: IReservation, id: string) {
    return this.http.put<IReservation>(`${this.mockApiUrl + 'reservations/'}${id}`, reservation);
  }
  deleteReservation(id: number) {
    return this.http.delete<number>(`${this.mockApiUrl + 'reservations/'}${id}`);
  }
}
