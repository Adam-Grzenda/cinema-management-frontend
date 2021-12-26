import { Component, OnInit } from '@angular/core';
import {Movie} from "../../model/movie";
import {MovieService} from "../movie.service";

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.css']
})
export class MovieListComponent implements OnInit {

  movies: Array<Movie>;

  constructor(private movieService: MovieService) {
  }

  ngOnInit(): void {
    this.movieService.getMovies().subscribe(next => this.movies = next);
  }

}
