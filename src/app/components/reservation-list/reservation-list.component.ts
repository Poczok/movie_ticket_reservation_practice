import {Component, OnDestroy, OnInit} from '@angular/core';
import {ReservationService} from "../../services/reservation.service";
import {IReservation} from "../../model/IReservation.interface";
import {catchError, switchMap} from "rxjs/operators";
import {BehaviorSubject, throwError} from "rxjs";
import {Router} from "@angular/router";
import {untilDestroyed} from "ngx-take-until-destroy";

@Component({
  selector: 'app-reservation-list',
  templateUrl: './reservation-list.component.html',
  styleUrls: ['./reservation-list.component.scss']
})
export class ReservationListComponent implements OnInit, OnDestroy {
  public reservations: IReservation[];
  public error: any;
  public columnsToDisplay = ['clientname', 'clientdob', 'moviename','date', 'time', 'buttons'];
  public refreshList$ = new BehaviorSubject<boolean>(false);
  constructor(private reservationService: ReservationService, private router: Router) { }

  ngOnInit(): void {
    this.refreshList$.pipe(
      switchMap(() =>
          this.reservationService.getReservations()
      ), catchError(err => throwError(err)), untilDestroyed(this))
      .subscribe((e: IReservation[]) => {
        this.reservations = e;
      }
    );
    this.refreshList$.next(true);
  }

  public modify(id: number) {
    this.router.navigate(['reservations', id]);
  }
  public delete(id: number) {
    /*
    Működésre megkapom a kívánt funkcionalitást, átnéztem a korábbi projektem és ott írtad, hogy jó lenne meghajtani
    a listafrissítést és nem újrahívni, igyekeztem annak megfelelni, remélem jól csináltam.
    Ezzel kapcsolatban egy olyan kérdésem lenne, hogy ilyen esetben nem érdemesebb sima Subjectet használni? Mivel
    az initial value-ja, hogy most épp true vagy false valójában abszolúlt nem számít ha én jól értelmezem,
    a lényleg tisztán a meghajtás, a next meghívása.
     */
    this.reservationService.deleteReservation(id)
      .pipe(catchError(err => throwError(err)), untilDestroyed(this)).subscribe((e:number) => {
      this.refreshList$.next(true);
    });
  }

  ngOnDestroy(): void {
  }
}
