import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Movie} from "../../../model/movie";
import {MovieService} from "../../movie.service";
import {ImageService} from "../../image.service";

@Component({
  selector: 'app-movie-add',
  templateUrl: './movie-add.component.html',
  styleUrls: ['./movie-add.component.css']
})
export class MovieAddComponent implements OnInit {

  @Input()
  editedMovie: Movie = new Movie();

  @Input()
  image: any;

  @Output()
  submittedEvent = new EventEmitter<any>();

  constructor(private movieService: MovieService,
              private imageService: ImageService) {
  }

  ngOnInit(): void {
  }

  onSubmit() {
    this.movieService.addMovie(this.editedMovie).subscribe(
      a => console.log("saved:" + a))

    this.submittedEvent.emit();
  }

  onImageUpload(input: any) : void {
    const image : File = input.files[0];
    const reader = new FileReader();

    reader.addEventListener('load', (event: any) =>
    {
      this.image = image;
      this.imageService.uploadImage(image)
        .subscribe((next) => {
          this.editedMovie.imageSource=next.href;
          console.log(this.editedMovie);
        });
    })

    reader.readAsDataURL(image);
  }

}
