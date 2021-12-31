import {Component, OnInit} from '@angular/core';
import {AdminListService} from "../../services/admin-list.service";
import {AdminList} from "../../../model/admin-list";
import {FilmService} from "../../services/film.service";
import {Film} from "../../../model/film";
import {CinemaService} from "../../services/cinema.service";
import {Cinema} from "../../../model/cinema";
import {Router} from "@angular/router";

@Component({
  selector: 'app-main-admin',
  templateUrl: './main-admin.component.html',
  styleUrls: ['./main-admin.component.css']
})
export class MainAdminComponent implements OnInit {
  panelOpenState = false;
  list: AdminList[] = [];
  films: Film[] = [];
  cinemas: Cinema[] = [];

  constructor(
    private adminListService: AdminListService,
    private cinemaService: CinemaService,
    private filmService: FilmService,
  ) {
  }

  ngOnInit(): void {
    this.getList();
    this.getFilms();
  }

  getList(): void {
    this.adminListService.getList().subscribe(list => this.list = list);
  }

  getFilms(): void {
    this.filmService.getFilms().subscribe(f => this.films = f.resources);
  }

  getCinemas(): void {
    this.cinemaService.getCinemas().subscribe(c => this.cinemas = c);
  }

  add(link:string): void {
    //Router.na

  }


}
