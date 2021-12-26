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
    movie1.description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum";
    movie1.imageSource="https://sm.ign.com/t/ign_in/gallery/s/spider-man/spider-man-far-from-home-official-movie-posters_epch.1080.jpg";

    const movie2 = new Movie();
    movie2.title="title2 test2";
    movie2.duration=131;
    movie2.director="test director2"
    movie2.premiere="13-12-2021"
    movie2.description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum";
    movie2.imageSource="https://i5.walmartimages.com/asr/df35a1cf-792e-417e-a73c-0c028e73e28d.45ce4ae056c8c0b3b1fce677f437a252.jpeg?odnHeight=612&odnWidth=612&odnBg=FFFFFF";
    this.movies.push(movie1, movie2);
  }
}
