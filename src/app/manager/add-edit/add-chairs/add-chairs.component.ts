import {Component, Inject, Input, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {FoodCourt} from "../../../../model/food-court";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ChairService} from "../../../services/chair.service";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-add-chairs',
  templateUrl: './add-chairs.component.html',
  styleUrls: ['./add-chairs.component.css']
})
export class AddChairsComponent implements OnInit {

  hallId: number;

  form: FormGroup;

  maxNumber: number = 25;

  constructor(
    @Inject(MAT_DIALOG_DATA) private data: {
      hallId: number
    },
    private chairService:ChairService,
    private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<AddChairsComponent>,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      rowNum: ["10", [Validators.required, Validators.pattern("[0-9]*"),
        Validators.min(1), Validators.max(this.maxNumber)]],
      colNum: ["10", [Validators.required, Validators.pattern("[0-9]*"),
        Validators.min(1), Validators.max(this.maxNumber)]],
    })
    this.hallId = this.data.hallId;
  }

  save() {
    console.log('chair addition: ', this.form.value.rowNum, this.form.value.colNum, this.hallId)
    this.chairService.addChairs(this.form.value.rowNum, this.form.value.colNum, this.hallId).subscribe(_ => {

      this.dialogRef.close();
    },
      _ => {
        this.dialogRef.close();

      });
  }

}
