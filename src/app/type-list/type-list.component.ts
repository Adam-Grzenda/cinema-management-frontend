import {Component, Input, OnInit} from '@angular/core';
import {TypeList} from "../../model/type-list";
import {AdminListService} from "../services/admin-list.service";
import {AddCinemaComponent} from "../admin/add-edit/add-cinema/add-cinema.component";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-type-list',
  templateUrl: './type-list.component.html',
  styleUrls: ['./type-list.component.css']
})
export class TypeListComponent implements OnInit {

  @Input()
  typeList: TypeList[];

  @Input()
  cinema_id: number = 0;

  constructor(
    private dialog: MatDialog
  ) {
  }

  ngOnInit(): void {
  }

}
