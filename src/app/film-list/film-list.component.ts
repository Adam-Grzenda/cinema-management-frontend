import {Component, OnInit} from '@angular/core';
import {Film} from "../../model/film";
import {FilmService} from "../services/film.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-movie-list',
  templateUrl: './film-list.component.html',
  styleUrls: ['./film-list.component.css']
})
export class FilmListComponent implements OnInit {

  movies: Array<Film>;
  editMovieId: number;

  constructor(
    public movieService: FilmService,
    private route: ActivatedRoute
  ) {
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(
      (params) => {
        const startDateParam = params['dateFrom']
        const endDateParam = params['dateTo']

        const startDate = startDateParam ? startDateParam : (new Date().toISOString());

        this.movieService.getFilms(startDate, endDateParam).subscribe((next) => {
          this.movies = next.resources;
          console.log(this.movies);
        });
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
