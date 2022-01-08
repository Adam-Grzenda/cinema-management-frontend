import {Component, Input, OnInit} from '@angular/core';
import {Film} from "../../../model/film";
import {FilmService} from "../../services/film.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-film-details',
  templateUrl: './film-details.component.html',
  styleUrls: ['./film-details.component.css']
})
export class FilmDetailsComponent implements OnInit {

  @Input() film?: Film;

  constructor(
    private route: ActivatedRoute,
    private filmService: FilmService,
  ) { }

  ngOnInit(): void {
    this.getFilm();
  }

  getFilm(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    console.log(id);
    this.filmService.getOne(id).subscribe(f => this.film = f);
  }
}
