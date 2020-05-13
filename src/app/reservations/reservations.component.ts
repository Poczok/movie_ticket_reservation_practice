import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {IMovie} from "../model/IMovie.interface";
import {ReservationService} from "../services/reservation.service";
import {catchError} from "rxjs/operators";
import {throwError} from "rxjs";
import {untilDestroyed} from "ngx-take-until-destroy";
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from "@angular/material/table";

@Component({
  selector: 'app-reservations',
  templateUrl: './reservations.component.html',
  styleUrls: ['./reservations.component.scss']
})
export class ReservationsComponent implements OnInit, OnDestroy {
  public movies: MatTableDataSource<IMovie>;
  // Remélem jó ez a típusosítás hozzá. (movies-hoz)
  public columnsToDisplay = ['title', 'pgRating', 'dates'];

  constructor(private reservationService: ReservationService) {
  }

  @ViewChild(MatSort, {static: true}) sort: MatSort;

  ngOnInit(): void {
    this.reservationService.getMovies().pipe(catchError(err => throwError(err)), untilDestroyed(this))
      .subscribe((e: IMovie[]) => {
        this.movies = new MatTableDataSource(e);
        this.movies.sort = this.sort;
        /* a sortolást is muszáj volt idepakolnom, mert ha kivülről rakom direkt az ngOnInit-be, akkor lefut a subscribe előtt
           és hibát dob. */
      });
  }

  ngOnDestroy(): void {
  }
}
