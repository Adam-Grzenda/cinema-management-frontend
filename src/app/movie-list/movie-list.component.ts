import {Component, OnInit} from '@angular/core';
import {Movie} from "../../model/movie";
import {MovieService} from "../movie.service";
import {ActivatedRoute} from "@angular/router";

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
    private route: ActivatedRoute
  ) {
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(
      (params) => {
        const startDateParam = params['dateFrom']
        const endDateParam = params['dateTo']

        const startDate = startDateParam ? startDateParam : (new Date().toISOString());

        this.movieService.getMovies(startDate, endDateParam).subscribe(next => this.movies = next);
      }
    )
  }

  onClickEdit(id: number): void {
    this.editMovieId = id;
  }

  onSubmittedEvent(): void {
    this.editMovieId = -1;
  }
}
