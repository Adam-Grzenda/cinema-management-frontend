import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Film} from "../../../model/film";
import {FilmService} from "../../film.service";
import {ImageService} from "../../image.service";

@Component({
  selector: 'app-movie-edit',
  templateUrl: './film-edit.component.html',
  styleUrls: ['./film-edit.component.css']
})
export class FilmEditComponent implements OnInit {

  @Input()
  editedMovie: Film = new Film();

  @Input()
  image: any;

  @Output()
  submittedEvent = new EventEmitter<any>();

  constructor(private movieService: FilmService,
              private imageService: ImageService) {
  }

  ngOnInit(): void {
  }

  onSubmit(): void {
    this.movieService.updateFilm(this.editedMovie).subscribe(
      a => console.log("updated: " + a))

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
