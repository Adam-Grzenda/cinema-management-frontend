import { Injectable } from '@angular/core';
import {Cinema} from "../../model/cinema";
import {Observable, of} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CinemaService {

  private cinemas: Array<Cinema>;



  public getCinemas(): Observable<Cinema[]> {
    return of(this.cinemas);
  }

  public addCinema(cinema: Cinema) : Observable<Cinema> {
    this.cinemas.push(cinema);
    return of(cinema);
  }

  constructor() {
    this.cinemas = new Array<Cinema>();

    const c1 = new Cinema();
    c1.name = "cinema 1"
    c1.address = "address 1"

    const c2= new Cinema();
    c2.name = "cinema 2"
    c2.address = "address 2"

    const c3 = new Cinema();
    c3.name = "cinema 3"
    c3.address = "address 3"

    this.cinemas.push(c1, c2, c3);
  }
}
