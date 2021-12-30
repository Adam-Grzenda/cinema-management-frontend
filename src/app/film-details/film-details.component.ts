import {Component, Input, OnInit} from '@angular/core';
import {Film} from "../../model/film";
import {FilmService} from "../film.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-movie-details',
  templateUrl: './film-details.component.html',
  styleUrls: ['./film-details.component.css']
})
export class FilmDetailsComponent implements OnInit {

  @Input() movie?: Film;

  constructor(
    private route: ActivatedRoute,
    private movieService: FilmService,
  ) { }

  ngOnInit(): void {
    this.getMovie();
  }

  getMovie(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    console.log(id);
    this.movieService.getFilm(id).subscribe(movie => this.movie = movie);
  }
}
