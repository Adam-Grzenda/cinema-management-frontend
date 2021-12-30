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

  films: Array<Film>;
  editFilmId: number;

  constructor(
    public filmService: FilmService,
    private route: ActivatedRoute
  ) {
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(
      (params) => {
        const startDateParam = params['dateFrom']
        const endDateParam = params['dateTo']

        const startDate = startDateParam ? startDateParam : (new Date().toISOString());

        this.filmService.getFilms(startDate, endDateParam).subscribe((next) => {
          this.films = next.resources;
          console.log(this.films);
        });
      }
    )
  }



  onClickEdit(id: number): void {
    this.editFilmId = id;
  }

  onSubmittedEvent(): void {
    this.editFilmId = -1;
  }
}
