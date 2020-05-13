import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {IMovie} from "../model/IMovie.interface";

@Injectable()
export class ReservationService {

  private mockApiUrl = 'http://localhost:3000/movies/';
  constructor(private http: HttpClient) { }

  getMovies() {
    return this.http.get<IMovie[]>(this.mockApiUrl);
  }
}
