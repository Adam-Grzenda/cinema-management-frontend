import {Component, Input, OnInit} from '@angular/core';
import {AdminList} from "../../../model/admin-list";

@Component({
  selector: 'app-type-list',
  templateUrl: './type-list.component.html',
  styleUrls: ['./type-list.component.css']
})
export class TypeListComponent implements OnInit {

  @Input()
  typeList:AdminList[];

  constructor() { }

  ngOnInit(): void {
  }

}
