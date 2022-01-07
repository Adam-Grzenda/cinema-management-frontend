import {Component, OnInit} from '@angular/core';
import {AdminListService} from "../../services/admin-list.service";
import {TypeList} from "../../../model/type-list";

@Component({
  selector: 'app-main-admin',
  templateUrl: './main-admin.component.html',
  styleUrls: ['./main-admin.component.css']
})
export class MainAdminComponent implements OnInit {

  typeList: TypeList[] = [];

  constructor(
    private adminListService: AdminListService,
  ) {
  }

  ngOnInit(): void {
    this.adminListService.getList().subscribe(list => {
      this.typeList = list;
    });
  }






}
