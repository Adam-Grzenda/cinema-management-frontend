import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {AdminListService} from "../../services/admin-list.service";
import {AdminList} from "../../../model/admin-list";

@Component({
  selector: 'app-main-admin',
  templateUrl: './main-admin.component.html',
  styleUrls: ['./main-admin.component.css']
})
export class MainAdminComponent implements OnInit {

  typeList: AdminList[] = [];

  constructor(
    private adminListService: AdminListService,
    private cdr:ChangeDetectorRef
  ) {
  }

  ngOnInit(): void {
    this.adminListService.getList().subscribe(list => {
      this.typeList = list;
      this.cdr.detectChanges();
    });
  }






}
