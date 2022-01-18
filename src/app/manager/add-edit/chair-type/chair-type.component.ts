import {Component, Inject, Input, OnInit} from '@angular/core';
import {Chair} from "../../../../model/chair";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {FoodCourt} from "../../../../model/food-court";
import {ChairService} from "../../../services/chair.service";

@Component({
  selector: 'app-chair-type',
  templateUrl: './chair-type.component.html',
  styleUrls: ['./chair-type.component.css']
})
export class ChairTypeComponent implements OnInit {

  chair: Chair;

  form: FormGroup;

  types: Array<string> = ['NORMAL', 'PREMIUM', 'DOUBLE'];

  constructor(
    @Inject(MAT_DIALOG_DATA) private data: {
      chair: Chair,
    },
    private chairService:ChairService,
    private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<ChairTypeComponent>
  ) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      type: ["", Validators.required],
    });

    this.chair = this.data.chair;
    this.form.patchValue(this.chair);
  }

  save() {
    this.chair.chairType = this.form.value.type;

    this.chairService.update(this.chair).subscribe(_ => {
      this.dialogRef.close();
    })
  }

}
