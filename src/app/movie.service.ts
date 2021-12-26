import { Injectable } from '@angular/core';
import {Movie} from "../model/movie";
import {Observable, of} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  private movies: Array<Movie>;

  public getMovies() : Observable<Array<Movie>>
  {
    return of(this.movies);
  }


  constructor() {
    this.movies = new Array<Movie>();
    const movie1 = new Movie();
    movie1.title="title1 test1";
    movie1.duration=130;
    movie1.director="test director"
    movie1.premiere="13-12-2020"

    const movie2 = new Movie();
    movie2.title="title2 test2";
    movie2.duration=131;
    movie2.director="test director2"
    movie2.premiere="13-12-2021"

    this.movies.push(movie1, movie2);
  }
}
