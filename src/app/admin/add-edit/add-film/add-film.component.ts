import {Component, Inject, Input, OnInit} from '@angular/core';
import {Film} from "../../../../model/film";
import {FilmService} from "../../../services/film.service";
import {ImageService} from "../../../services/image.service";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-add-film',
  templateUrl: './add-film.component.html',
  styleUrls: ['./add-film.component.css']
})
export class AddFilmComponent implements OnInit {

  public addMode: boolean = true;

  film: Film;

  @Input()
  image: any;


  form: FormGroup;

  constructor(
    @Inject(MAT_DIALOG_DATA) private data: { film: Film },
    private filmService: FilmService,
    private imageService: ImageService,
    private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<AddFilmComponent>
  ) {
  }

  ngOnInit(): void {

    this.addMode = this.data.film == null

    this.form = this.formBuilder.group({
      title: ["", [Validators.required]],
      director: ["", [Validators.required]],
      duration: ["", [Validators.required, Validators.min(0)]],
      premiereDate: ["", [Validators.required]],
      is3D: false,
      description: [""]
    });

    if (this.addMode) {
      this.film = new Film();
    } else {
      this.film = this.data.film;
      // @ts-ignore
      this.film.is3D = this.data.film['3D']
      this.form.patchValue(this.film);
      this.form.patchValue({
        is3D: this.film.is3D
      });
    }
  }

  save() {
    this.film.title = this.form.value.title;
    this.film.director = this.form.value.director;
    this.film.duration = this.form.value.duration;
    this.film.premiereDate = this.form.value.premiereDate;
    // @ts-ignore
    this.film['3D'] = this.form.value.is3D;
    this.film.description = this.form.value.description;

    if (this.addMode) {
      this.filmService.add(this.film).subscribe(f => {
        this.dialogRef.close();
      });
    } else {
      this.filmService.update(this.film).subscribe(f => {
        this.dialogRef.close();
      });
    }
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
