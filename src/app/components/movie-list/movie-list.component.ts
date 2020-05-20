import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {IMovie} from "../../model/IMovie.interface";
import {ReservationService} from "../../services/reservation.service";
import {catchError} from "rxjs/operators";
import {throwError} from "rxjs";
import {untilDestroyed} from "ngx-take-until-destroy";
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from "@angular/material/table";

@Component({
  selector: 'app-reservations',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.scss']
})
export class MovieListComponent implements OnInit, OnDestroy {
  public movies: MatTableDataSource<IMovie>;
  public columnsToDisplay = ['title', 'pgRating', 'dates'];

  constructor(private reservationService: ReservationService) {
  }

  @ViewChild(MatSort, {static: true}) sort: MatSort;

  ngOnInit(): void {
    this.reservationService
      .getMovies()
      .pipe(
        catchError(err => throwError(err)), untilDestroyed(this))
      .subscribe((e: IMovie[]) => {
        /*TODO: ide jöhetett volna valami null check. Ha az e null, akkor mondjuk beállítod üres tömbre.
        *  Mert ha null-t kap a new MatTableDataSource, akkor nem fog működni*/
        this.movies = new MatTableDataSource(e);
        this.movies.sort = this.sort;
      });
  }

  ngOnDestroy(): void {
  }
}
