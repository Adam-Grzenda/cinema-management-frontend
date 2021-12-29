import {Injectable} from '@angular/core';
import {Movie} from "../model/movie";
import {Observable} from "rxjs";
import {HateoasResourceService, ResourceCollection} from "@lagoshny/ngx-hateoas-client";

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  public getMovies(dateFrom?: string, dateTo?: string) : Observable<ResourceCollection<Movie>>
  {
    return this.resourceService.getCollection(Movie);
  }


  public getMovie(id: number): Observable<Movie> {
    return this.resourceService.getResource(Movie, id);
  }

  public addMovie(movie: Movie) : Observable<Movie> {
    return this.resourceService.createResource(Movie, {body: movie});
  }

  public updateMovie(movie: Movie) : Observable<Movie> {
    return this.resourceService.updateResource(movie);
  }

  public deleteMovie(movie: Movie) : Observable<Movie> {
    return this.resourceService.deleteResource(movie);
  }

  public addSampleMovies(): void{
    let movies : Movie[] = this.sampleMovies();
    for (let i=0; i<movies.length; i++) {
      this.addMovie(movies[i]).subscribe(next => console.log(next))
    }
  }

  constructor(private resourceService: HateoasResourceService) {
  }

  private sampleMovies() : Array<Movie>{
    const movie1 = new Movie();
    movie1.title="Spider-Man: Far From Home";
    movie1.duration=129;
    movie1.director="Jon Watts"
    movie1.premiereDate="2021-12-09"
    movie1.description="Spider-Man: Far From Home is a 2019 American superhero film based on the Marvel Comics character Spider-Man, co-produced by Columbia Pictures and Marvel Studios, and distributed by Sony Pictures Releasing. It is the sequel to Spider-Man: Homecoming (2017) and the 23rd film in the Marvel Cinematic Universe (MCU). The film was directed by Jon Watts, written by Chris McKenna and Erik Sommers, and stars Tom Holland as Peter Parker / Spider-Man, alongside Samuel L. Jackson, Zendaya, Cobie Smulders, Jon Favreau, J. B. Smoove, Jacob Batalon, Martin Starr, Marisa Tomei, and Jake Gyllenhaal. In the film, Parker is recruited by Nick Fury (Jackson) and Mysterio (Gyllenhaal) to face the Elementals while he is on a school trip to Europe.";
    movie1.imageSource="https://sm.ign.com/t/ign_in/gallery/s/spider-man/spider-man-far-from-home-official-movie-posters_epch.1080.jpg";
    movie1.id=1;

    const movie2 = new Movie();
    movie2.title="title2 test2";
    movie2.duration=131;
    movie2.director="test director2"
    movie2.premiereDate="2021-12-01"
    movie2.description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum";
    movie2.imageSource="https://i5.walmartimages.com/asr/df35a1cf-792e-417e-a73c-0c028e73e28d.45ce4ae056c8c0b3b1fce677f437a252.jpeg?odnHeight=612&odnWidth=612&odnBg=FFFFFF";
    movie2.id=2;

    const movie3 = new Movie();
    movie3.title="title4 test4";
    movie3.duration=131;
    movie3.director="test director3"
    movie3.premiereDate="2021-12-02"
    movie3.description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum";
    movie3.imageSource="https://i5.walmartimages.com/asr/df35a1cf-792e-417e-a73c-0c028e73e28d.45ce4ae056c8c0b3b1fce677f437a252.jpeg?odnHeight=612&odnWidth=612&odnBg=FFFFFF";
    movie3.id=3;

    const movie4 = new Movie();
    movie4.title="title4 test4";
    movie4.duration=131;
    movie4.director="test director3"
    movie4.premiereDate="2021-12-03"
    movie4.description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum";
    movie4.imageSource="https://i5.walmartimages.com/asr/df35a1cf-792e-417e-a73c-0c028e73e28d.45ce4ae056c8c0b3b1fce677f437a252.jpeg?odnHeight=612&odnWidth=612&odnBg=FFFFFF";
    movie4.id=4;

    const movie5 = new Movie();
    movie5.title="title4 test4";
    movie5.duration=131;
    movie5.director="test director3"
    movie5.premiereDate="2021-12-04"
    movie5.description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum";
    movie5.imageSource="https://i5.walmartimages.com/asr/df35a1cf-792e-417e-a73c-0c028e73e28d.45ce4ae056c8c0b3b1fce677f437a252.jpeg?odnHeight=612&odnWidth=612&odnBg=FFFFFF";
    movie5.id=5;

    return Array.of(movie1, movie2, movie3, movie4)
  }

  private static isDateBetween(premiere: string, dateFrom: any, dateTo: any): boolean {
    const premiereDate = new Date(premiere);
    let isBetween : boolean = true;
    if (dateFrom && new Date(dateFrom) > premiereDate) {
      isBetween = false;
    }
    if (dateTo && new Date(dateTo) < premiereDate) {
      isBetween = false;
    }
    return isBetween;
  }
}
