import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Movie} from "../../../model/movie";
import {MovieService} from "../../movie.service";

@Component({
  selector: 'app-movie-add',
  templateUrl: './movie-add.component.html',
  styleUrls: ['./movie-add.component.css']
})
export class MovieAddComponent implements OnInit {

  @Input()
  editedMovie: Movie = new Movie();

  @Output()
  submittedEvent = new EventEmitter<any>();

  constructor(private movieService: MovieService) {
  }

  ngOnInit(): void {
  }

  onSubmit() {
    this.movieService.addMovie(this.editedMovie).subscribe(
      a => console.log("saved:" + a))

    this.submittedEvent.emit();
  }

}
