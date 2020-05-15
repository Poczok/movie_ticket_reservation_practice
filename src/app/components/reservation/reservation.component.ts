import {Component, OnDestroy, OnInit} from '@angular/core';
import {ReservationService} from "../../services/reservation.service";
import {IMovie} from "../../model/IMovie.interface";
import {FormControl, FormGroup} from "@angular/forms";
import {untilDestroyed} from "ngx-take-until-destroy";
import {ActivatedRoute, ParamMap, Router} from "@angular/router";
import {catchError, switchMap} from "rxjs/operators";
import {of, throwError} from "rxjs";
import {IReservation} from "../../model/IReservation.interface";

@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.scss']
})
export class ReservationComponent implements OnInit, OnDestroy {
  public movies: IMovie[];
  public selectedMovieSchedule: object;
  public movieKeys: string[];
  public movieValues: string[][];
  public id: string;

  public movieControl = new FormControl(null);
  public nameControl = new FormControl(null);
  public timeControl = new FormControl(null);
  public dobControl = new FormControl(null);
  public dateControl = new FormControl(null);
  public form = new FormGroup({
    movie: this.movieControl,
    time: this.timeControl,
    date: this.dateControl,
    name: this.nameControl,
    dob: this.dobControl
  });

  constructor(private reservationService: ReservationService, private activatedRoute: ActivatedRoute, private router: Router) {
  }

  ngOnInit(): void {
    this.reservationService.getMovies().pipe(catchError(err => {
      return throwError(err);
    }), untilDestroyed(this))
      .subscribe((e: IMovie[]) => {
        this.movies = e;
      });

    this.movieControl.valueChanges.pipe(untilDestroyed(this)).subscribe((e: number) => {
      if (e === null) {
        return;
      }
      this.selectedMovieSchedule = Object.entries(this.movies.find(f => f.id === e).schedule);
      this.movieKeys = Object.keys(this.movies.find(f => f.id === e).schedule);
      this.movieValues = Object.values(this.movies.find(f => f.id === e).schedule);
      this.timeControl.setValue(null);
      this.dateControl.setValue(null);
    });

    this.activatedRoute.paramMap.pipe(
      switchMap((param: ParamMap) => {
        this.id = param.get('id');
        if (this.id === null) {
          return of(null);
        }
        return this.reservationService.getReservationById(this.id).pipe(catchError(err => throwError(err)));
      }), untilDestroyed(this))
      .subscribe((reservation: IReservation) => {
        if (reservation !== null) {
          this.form.patchValue(reservation);
        }
      });
  }

  public save() {
    if (this.id === null) {
      this.reservationService.saveReservation(this.form.getRawValue()).pipe(untilDestroyed(this)).subscribe(e => {
        this.router.navigate(['movie-list']);
      });
    }
    this.reservationService.updateReservation(this.form.getRawValue(), this.id)
      .pipe(catchError(err => throwError(err)), untilDestroyed(this))
      .subscribe(_ => {
        // ilyen esetben lehet használni az alávonást, ha nem akarunk jelenleg semmit sem kezdeni az érkező adattal?
        this.router.navigate(['movie-list']);
      })
  }

  public saveDate(date: string) {
    // így tudtam kiszedni a date-et
    // ez valamiért buggosan működik mert kétszer fut meg és csak két kattintásra frissül be a jó adattal a date,
    // nem akartam túl sokat rugózni ezen, van egy olyan érzésem, hogy ez az egész rész itt nem jó :-/
    this.dateControl.setValue(date);
  }

  ngOnDestroy(): void {
  }
}
