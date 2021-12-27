import { Component, OnInit } from '@angular/core';
import {Movie} from "../../model/movie";
import {MovieService} from "../movie.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.css']
})
export class MovieListComponent implements OnInit {

  movies: Array<Movie>;
  editMovieId: number;

  constructor(
    private movieService: MovieService,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.movieService.getMovies().subscribe(next => this.movies = next);
  }

  onClickAdd(): void {
    this.router.navigate(['admin', 'movies']);
  }

  onClickEdit(id: number): void {
    this.editMovieId = id;
  }

  onSubmittedEvent(): void {
    this.editMovieId = -1;
  }
}
