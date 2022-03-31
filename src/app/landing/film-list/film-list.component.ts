import {Component, OnInit} from '@angular/core';
import {Film} from "../../../model/film";
import {FilmService} from "../../services/film.service";
import {ActivatedRoute} from "@angular/router";
import {SortDirection} from "../sidebar/filter/filter.component";

@Component({
  selector: 'app-film-list',
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
    this.loadFilms();
    this.route.queryParams.subscribe(
      (next) =>
      {
        let value = next['sort'];
        let index = Object.values(SortDirection).find(a => a.replace(' ', '') == value);
        if (index) {
          this.sortBy(index);
        }
      }
    )
  }


  private loadFilms() {
    this.filmService.getAll().subscribe((next) => {
      this.films = next;
      console.log(this.films);
    });
  }

  onClickEdit(id: number): void {
    this.editFilmId = id;
  }

  onSubmittedEvent(): void {
    this.editFilmId = -1;
  }

  private sortBy(sortDirection: SortDirection) {
    switch (sortDirection){
      case SortDirection.BY_NAME_ASC:
        this.films.sort((a, b) => a.title.localeCompare(b.title))
        break;
      case SortDirection.BY_NAME_DESC:
        this.films.sort((a, b) => -1 * a.title.localeCompare(b.title))
        break;
      case SortDirection.BY_PREMIERE_ASC:
        this.films.sort((a, b) => (new Date(a.premiereDate)).getDate() - (new Date(b.premiereDate)).getDate())
        break;
      case SortDirection.BY_PREMIERE_DESC:
        this.films.sort((a, b) => (new Date(b.premiereDate)).getDate() - (new Date(a.premiereDate)).getDate())
        break;
    }
  }
}
