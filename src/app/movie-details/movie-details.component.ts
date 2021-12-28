import {Component, Input, OnInit} from '@angular/core';
import {Movie} from "../../model/movie";
import {MovieService} from "../movie.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.css']
})
export class MovieDetailsComponent implements OnInit {

  @Input() movie?: Movie;

  constructor(
    private route: ActivatedRoute,
    private movieService: MovieService,
  ) { }

  ngOnInit(): void {
    this.getMovie();
  }

  getMovie(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    console.log(id);
    this.movieService.getMovie(id).subscribe(movie => this.movie = movie);
  }
}
