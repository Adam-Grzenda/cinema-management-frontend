import {Injectable} from '@angular/core';
import {CinemaHall} from "../../model/cinema-hall";
import {Observable, of} from "rxjs";
import {CinemaService} from "./cinema.service";
import {ServiceInterface} from "./serviceInterface";

@Injectable({
  providedIn: 'root'
})
export class CinemaHallService {

  private cinemaHalls: Array<CinemaHall>;

  constructor(
    private cinemaService: CinemaService,
  ) {
    this.cinemaHalls = new Array<CinemaHall>();

    /*const h1: CinemaHall = new CinemaHall();
    h1.number = 1;
    h1.type = "normal";
    this.cinemaService.getCinema(1).subscribe(c => h1.cinema = c);

    const h2: CinemaHall = new CinemaHall();
    h2.number = 2;
    h2.type = "premium";
    this.cinemaService.getCinema(1).subscribe(c => h1.cinema = c);

    const h3: CinemaHall = new CinemaHall();
    h3.number = 1;
    h3.type = "imax";
    this.cinemaService.getCinema(2).subscribe(c => h1.cinema = c);


    this.cinemaHalls.push(h1, h2, h3);*/

  }

  public getHalls(): Observable<CinemaHall[]> {
    return of(this.cinemaHalls)
  }

  public addHall(cinemaHall: CinemaHall): Observable<CinemaHall> {
    this.cinemaHalls.push(cinemaHall);
    return of(cinemaHall);
  }

}
