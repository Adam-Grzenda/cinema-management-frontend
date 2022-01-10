import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Film} from "../../../../model/film";
import {FilmService} from "../../../services/film.service";
import {ImageService} from "../../../services/image.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-film-edit',
  templateUrl: './film-edit.component.html',
  styleUrls: ['./film-edit.component.css']
})
export class FilmEditComponent implements OnInit {

  public addMode: boolean = true;
  private id: number;

  @Input()
  film: Film = new Film();

  @Input()
  image: any;

  @Output()
  submittedEvent = new EventEmitter<any>();

  form: FormGroup;

  constructor(
    private filmService: FilmService,
    private imageService: ImageService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute
  ) {
  }

  ngOnInit(): void {

    this.id = this.route.snapshot.params['id'];
    this.addMode = !this.id;

    this.form = this.formBuilder.group({
      title: ["", [Validators.required]],
      director: ["", [Validators.required]],
      duration: ["", [Validators.required]],
      imageSource: ["", [Validators.required]],
      premiereDate: ["", [Validators.required]],
      description: [""]
    })

    if (!this.addMode) {
      this.filmService.getOne(this.id).subscribe(f => {
        this.film = f;
        this.form.patchValue({
          title: this.film.title,
          director: this.film.director,
          duration: this.film.duration,
          premiereDate: this.film.premiereDate,
          description: this.film.description
        });
        console.log("gfhh")
        console.log(f)
        console.log(this.film)
      })
    }
  }

  save(): void {
    this.filmService.update(this.film).subscribe(
      a => console.log("updated: " + a))

    this.submittedEvent.emit();

    this.form.reset();

    this.film = new Film();
  }

  onImageUpload(input: any): void {
    const image: File = input.files[0];
    const reader = new FileReader();

    reader.addEventListener('load', (event: any) => {
      this.image = image;
      this.imageService.uploadImage(image)
        .subscribe((next) => {
          this.film.imageSource = next.href;
          console.log(this.film);
        });
    })

    reader.readAsDataURL(image);
  }

}
