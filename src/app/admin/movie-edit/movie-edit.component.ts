import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Movie} from "../../../model/movie";
import {MovieService} from "../../services/movie.service";

@Component({
  selector: 'app-movie-edit',
  templateUrl: './movie-edit.component.html',
  styleUrls: ['./movie-edit.component.css']
})
export class MovieEditComponent implements OnInit {

  @Input()
  editedMovie: Movie = new Movie();

  @Output()
  submittedEvent = new EventEmitter<any>();

  constructor(private movieService: MovieService) {
  }

  ngOnInit(): void {
  }

  onSubmit(): void {
    this.movieService.updateMovie(this.editedMovie).subscribe(
      a => console.log("updated: " + a))

    this.submittedEvent.emit();
  }

}
