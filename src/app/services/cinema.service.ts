import { Injectable } from '@angular/core';
import {Cinema} from "../../model/cinema";
import {Observable, of} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CinemaService {

  private cinemas: Array<Cinema>

  constructor() {
    this.cinemas = new Array<Cinema>();
  }

  public getCinemas(): Observable<Cinema[]> {
    return of(this.cinemas);
  }

  public addCinema(cinema: Cinema) : Observable<Cinema> {
    this.cinemas.push(cinema);
    return of(cinema);
  }
}
