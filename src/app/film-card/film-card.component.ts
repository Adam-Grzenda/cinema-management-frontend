import {Component, Input, OnInit} from '@angular/core';
import {Film} from "../../model/film";
import {ImageService} from "../services/image.service";

@Component({
  selector: 'app-film-card',
  templateUrl: './film-card.component.html',
  styleUrls: ['./film-card.component.css']
})
export class FilmCard implements OnInit {

  @Input()
  film: Film;

  filmImage: any;

  constructor(private imageService: ImageService) { }

  ngOnInit(): void {
    this.getFilmImage(this.film.imageSource);
  }

  createImageURL(image: Blob) {
    let reader = new FileReader();
    reader.addEventListener("load", () => {
      this.filmImage = reader.result;
    })

    if (image) {
      reader.readAsDataURL(image);
    }
  }

  getFilmImage(imageId: string) {
    this.imageService.getImage(imageId).subscribe(data => {
      this.createImageURL(data);
    })
  }


}
