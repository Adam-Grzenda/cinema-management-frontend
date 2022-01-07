import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Film} from "../../../model/film";
import {FilmService} from "../../services/film.service";
import {ImageService} from "../../services/image.service";

@Component({
  selector: 'app-film-add',
  templateUrl: './film-add.component.html',
  styleUrls: ['./film-add.component.css']
})
export class FilmAddComponent implements OnInit {

  @Input()
  editedFilm: Film = new Film();

  @Input()
  image: any;

  @Output()
  submittedEvent = new EventEmitter<any>();

  constructor(private filmService: FilmService,
              private imageService: ImageService) {
  }

  ngOnInit(): void {
  }

  onSubmit() {
    this.filmService.add(this.editedFilm).subscribe(
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
          this.editedFilm.imageSource=next.href;
          console.log(this.editedFilm);
        });
    })

    reader.readAsDataURL(image);
  }

}
