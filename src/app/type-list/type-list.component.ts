import {Component, Input, OnInit} from '@angular/core';
import {TypeList} from "../../model/type-list";
import {AdminListService} from "../services/admin-list.service";

@Component({
  selector: 'app-type-list',
  templateUrl: './type-list.component.html',
  styleUrls: ['./type-list.component.css']
})
export class TypeListComponent implements OnInit {

  @Input()
  typeList:TypeList[];

  @Input()
  cinema_id: number = 0;

  constructor(
  ) { }

  ngOnInit(): void {
  }

  load(type: TypeList) {
    //this.adminListService.updateList(type.id);

  }
}
