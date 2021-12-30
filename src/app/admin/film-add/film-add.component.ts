import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Film} from "../../../model/film";
import {FilmService} from "../../film.service";
import {ImageService} from "../../image.service";

@Component({
  selector: 'app-movie-add',
  templateUrl: './film-add.component.html',
  styleUrls: ['./film-add.component.css']
})
export class FilmAddComponent implements OnInit {

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

  onSubmit() {
    this.movieService.addFilm(this.editedMovie).subscribe(
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
