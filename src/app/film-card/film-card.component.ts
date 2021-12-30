import {Component, Input, OnInit} from '@angular/core';
import {Film} from "../../model/film";
import {ImageService} from "../image.service";

@Component({
  selector: 'app-movie-card',
  templateUrl: './film-card.component.html',
  styleUrls: ['./film-card.component.css']
})
export class FilmCard implements OnInit {

  @Input()
  movie: Film;

  movieImage: any;

  constructor(private imageService: ImageService) { }

  ngOnInit(): void {
    this.getMovieImage(this.movie.imageSource);
  }

  createImageURL(image: Blob) {
    let reader = new FileReader();
    reader.addEventListener("load", () => {
      this.movieImage = reader.result;
    })

    if (image) {
      reader.readAsDataURL(image);
    }
  }

  getMovieImage(imageId: string) {
    this.imageService.getImage(imageId).subscribe(data => {
      this.createImageURL(data);
    })
  }


}
