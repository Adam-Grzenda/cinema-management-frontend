import {Component, Inject, OnInit} from '@angular/core';
import {Film} from "../../../../model/film";
import {FilmService} from "../../../services/film.service";
import {ImageService} from "../../../services/image.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {MatSnackBar} from "@angular/material/snack-bar";
import {FilesService} from "../../../services/files.service";
import {FileManagementComponent} from "../file-management/file-management.component";
import {File} from "../../../../model/file";

@Component({
  selector: 'app-add-film',
  templateUrl: './add-film.component.html',
  styleUrls: ['./add-film.component.css']
})
export class AddFilmComponent implements OnInit {

  public addMode: boolean = true;

  film: Film;
  image: string;
  form: FormGroup;
  file: File;

  constructor(
    @Inject(MAT_DIALOG_DATA) private data: { film: Film },
    private filmService: FilmService,
    private imageService: ImageService,
    private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<AddFilmComponent>,
    private snackBar: MatSnackBar,
    private filesService: FilesService,
    private dialog: MatDialog
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
      this.filmService.add(this.film, this.image).subscribe(_ => {
          this.dialogRef.close();
        },
        _ => {
          this.snackBar.open("Error! This film violates unique constraint and could not be added.", "close", {
            duration: 5000
          });
        });
    } else {
      this.filmService.update(this.film).subscribe(_ => {
          this.dialogRef.close();
        },
        _ => {
          this.snackBar.open("Error! This film violates unique constraint and could not be updated.", "close", {
            duration: 5000
          });
        });
    }
  }

  doFileSelection() {
    const selectorRef = this.dialog.open(FileManagementComponent, {
      height: '100%',
      width: '100%',
    })

    selectorRef.afterClosed().subscribe(res => {
        this.file = res.data
    })
  }

  // onImageUpload(input: any): void {
  //   const image: File = input.files[0];
  //   const reader = new FileReader();
  //
  //   reader.addEventListener('load', (event: any) => {
  //     this.image = reader.result as string
  //     this.image = this.image.split(',')[1];
  //   });
  //
  //   reader.readAsDataURL(image);
  // }

}
