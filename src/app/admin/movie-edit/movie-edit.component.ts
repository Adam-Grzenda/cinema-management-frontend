import {Component, Input, OnInit} from '@angular/core';
import {Movie} from "../../../model/movie";
import {MovieService} from "../../movie.service";

@Component({
  selector: 'app-movie-edit',
  templateUrl: './movie-edit.component.html',
  styleUrls: ['./movie-edit.component.css']
})
export class MovieEditComponent implements OnInit {

  @Input()
  editedMovie: Movie = new Movie();

  constructor(private movieService: MovieService) { }

  ngOnInit(): void {
  }

  onSaveMovie(): void {
    this.movieService.addMovie(this.editedMovie).subscribe(
      a => console.log("saved:"+a)
    )
  }

}
