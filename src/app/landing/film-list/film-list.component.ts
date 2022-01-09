import {Component, OnInit} from '@angular/core';
import {Film} from "../../../model/film";
import {FilmService} from "../../services/film.service";

@Component({
  selector: 'app-film-list',
  templateUrl: './film-list.component.html',
  styleUrls: ['./film-list.component.css']
})
export class FilmListComponent implements OnInit {

  films: Array<Film>;
  editFilmId: number;

  constructor(
    public filmService: FilmService
  ) {
  }

  ngOnInit(): void {
    this.loadFilms();
  }


  private loadFilms() {
    this.filmService.getFilms().subscribe((next) => {
      this.films = next.resources;
      console.log(this.films);
    });
  }

  onClickEdit(id: number): void {
    this.editFilmId = id;
  }

  onSubmittedEvent(): void {
    this.editFilmId = -1;
  }
}
