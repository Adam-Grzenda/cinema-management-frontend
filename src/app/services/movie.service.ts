import { Injectable } from '@angular/core';
import {Movie} from "../../model/movie";
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

  public getMovie(id: number): Observable<Movie> {
    const movie = this.movies.find(m => m.id === id)!;
    return of(movie);
  }

  public addMovie(movie: Movie) : Observable<Movie> {
    this.movies.push(movie);
    return of(movie);
  }

  public updateMovie(movie: Movie) : Observable<Movie> {
    let index = this.movies.findIndex(x => x.id === movie.id);
    this.movies[index] = movie;
    return of(movie);
  }

  constructor() {
    this.movies = new Array<Movie>();
    const movie1 = new Movie();
    movie1.title="Spider-Man: Far From Home";
    movie1.duration=129;
    movie1.director="Jon Watts"
    movie1.premiere="26-06-2019"
    movie1.description="Spider-Man: Far From Home is a 2019 American superhero film based on the Marvel Comics character Spider-Man, co-produced by Columbia Pictures and Marvel Studios, and distributed by Sony Pictures Releasing. It is the sequel to Spider-Man: Homecoming (2017) and the 23rd film in the Marvel Cinematic Universe (MCU). The film was directed by Jon Watts, written by Chris McKenna and Erik Sommers, and stars Tom Holland as Peter Parker / Spider-Man, alongside Samuel L. Jackson, Zendaya, Cobie Smulders, Jon Favreau, J. B. Smoove, Jacob Batalon, Martin Starr, Marisa Tomei, and Jake Gyllenhaal. In the film, Parker is recruited by Nick Fury (Jackson) and Mysterio (Gyllenhaal) to face the Elementals while he is on a school trip to Europe.";
    movie1.imageSource="https://sm.ign.com/t/ign_in/gallery/s/spider-man/spider-man-far-from-home-official-movie-posters_epch.1080.jpg";
    movie1.id=1;

    const movie2 = new Movie();
    movie2.title="title2 test2";
    movie2.duration=131;
    movie2.director="test director2"
    movie2.premiere="13-12-2021"
    movie2.description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum";
    movie2.imageSource="https://i5.walmartimages.com/asr/df35a1cf-792e-417e-a73c-0c028e73e28d.45ce4ae056c8c0b3b1fce677f437a252.jpeg?odnHeight=612&odnWidth=612&odnBg=FFFFFF";
    movie2.id=2;

    const movie3 = new Movie();
    movie3.title="title4 test4";
    movie3.duration=131;
    movie3.director="test director3"
    movie3.premiere="13-12-2021"
    movie3.description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum";
    movie3.imageSource="https://i5.walmartimages.com/asr/df35a1cf-792e-417e-a73c-0c028e73e28d.45ce4ae056c8c0b3b1fce677f437a252.jpeg?odnHeight=612&odnWidth=612&odnBg=FFFFFF";
    movie3.id=3;

    const movie4 = new Movie();
    movie4.title="title4 test4";
    movie4.duration=131;
    movie4.director="test director3"
    movie4.premiere="13-12-2021"
    movie4.description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum";
    movie4.imageSource="https://i5.walmartimages.com/asr/df35a1cf-792e-417e-a73c-0c028e73e28d.45ce4ae056c8c0b3b1fce677f437a252.jpeg?odnHeight=612&odnWidth=612&odnBg=FFFFFF";
    movie4.id=4;

    const movie5 = new Movie();
    movie5.title="title4 test4";
    movie5.duration=131;
    movie5.director="test director3"
    movie5.premiere="13-12-2021"
    movie5.description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum";
    movie5.imageSource="https://i5.walmartimages.com/asr/df35a1cf-792e-417e-a73c-0c028e73e28d.45ce4ae056c8c0b3b1fce677f437a252.jpeg?odnHeight=612&odnWidth=612&odnBg=FFFFFF";
    movie5.id=5;


    this.movies.push(movie1, movie2, movie3, movie4, movie5);
  }

}
