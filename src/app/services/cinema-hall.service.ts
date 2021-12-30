import { Injectable } from '@angular/core';
import {CinemaHall} from "../../model/cinema-hall";
import {Observable, of} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CinemaHallService {

  private cinemaHalls: Array<CinemaHall>;

  constructor() {
    this.cinemaHalls = new Array<CinemaHall>();
  }

  public getHalls(): Observable<CinemaHall[]> {
    return of(this.cinemaHalls)
  }

  public addHall(cinemaHall: CinemaHall): Observable<CinemaHall> {
    this.cinemaHalls.push(cinemaHall);
    return of(cinemaHall);
  }
}
