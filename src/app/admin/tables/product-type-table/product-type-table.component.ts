import {Component, OnInit, ViewChild} from '@angular/core';
import {ProductType} from "../../../../model/product-type";
import {MatTableDataSource} from "@angular/material/table";
import {CinemaHall} from "../../../../model/cinema-hall";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {ProductTypeService} from "../../../services/product-type.service";
import {MatDialog} from "@angular/material/dialog";
import {AddProductTypeComponent} from "../../add-edit/add-product-type/add-product-type.component";

@Component({
  selector: 'app-product-type-table',
  templateUrl: './product-type-table.component.html',
  styleUrls: ['./product-type-table.component.css']
})
export class ProductTypeTableComponent implements OnInit {

  private types:Array<ProductType>;

  dataSource: MatTableDataSource<ProductType>;
  displayedColumns: string[] =
    ['id', 'name', 'unit', 'amount', 'modify', 'delete'];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private productTypeService:ProductTypeService,
    private dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.getTypes();
  }

  private getTypes() {
    this.productTypeService.getAll().subscribe(t => {
      this.types = t.resources;

      this.dataSource = new MatTableDataSource<ProductType>(this.types);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  delete(type: ProductType) {
    this.productTypeService.delete(type).subscribe(t => {
      this.getTypes();
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  modify(type: ProductType): void {
    const dialogRef = this.dialog.open(AddProductTypeComponent, {
      data: {type: type},
      height: '60%',
      width: '50%'
    });

    dialogRef.afterClosed().subscribe(_=> {
      this.getTypes();
    })
  }

  add(): void {
    const dialogRef = this.dialog.open(AddProductTypeComponent, {
      data: {type: null},
      height: '60%',
      width: '50%'
    });

    dialogRef.afterClosed().subscribe(_=> {
      this.getTypes();
    });
  }

}
