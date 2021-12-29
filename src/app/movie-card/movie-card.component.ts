import {Component, Input, OnInit} from '@angular/core';
import {Movie} from "../../model/movie";
import {ImageService} from "../image.service";

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.css']
})
export class MovieCardComponent implements OnInit {

  @Input()
  movie: Movie;

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
