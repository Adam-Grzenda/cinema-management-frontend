import {Component, OnInit, ViewChild} from '@angular/core';
import {Advertisement} from "../../../../model/advertisement";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {AdvertisementService} from "../../../services/advertisement.service";
import {FilmService} from "../../../services/film.service";
import {MatDialog} from "@angular/material/dialog";
import {Film} from "../../../../model/film";
import {AddAdvertisementComponent} from "../../add-edit/add-advertisement/add-advertisement.component";

@Component({
  selector: 'app-advertisement-table',
  templateUrl: './advertisement-table.component.html',
  styleUrls: ['./advertisement-table.component.css']
})
export class AdvertisementTableComponent implements OnInit {

  private advertisements: Array<Advertisement>;

  dataSource: MatTableDataSource<Advertisement>;
  displayedColumns: string[] =
    ['id', 'companyName', 'duration', 'film_id', 'modify', 'delete'];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private advertisementService: AdvertisementService,
    private filmService: FilmService,
    private dialog: MatDialog,
  ) {
  }

  ngOnInit(): void {
    this.getAds();
  }

  private getAds() {
    this.advertisementService.getAll().subscribe(a => {
      this.advertisements = a.resources;

      for (let ad of this.advertisements) {
        ad.getRelation<Film>('film').subscribe(f => {
            ad.film = f;
          },
          error => {
          })
      }
      this.dataSource = new MatTableDataSource<Advertisement>(this.advertisements);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;

    })
  }

  delete(ad: Advertisement) {
    this.advertisementService.delete(ad).subscribe(a => {
      console.log("deleted: " + a.id);
      this.getAds();
    })

  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  modify(ad: Advertisement): void {
    const dialogRef = this.dialog.open(AddAdvertisementComponent, {
      data: {ad: ad},
      height: '80%',
      width: '50%'
    });

    dialogRef.afterClosed().subscribe(_=> {
      this.getAds();
    });
  }

  add() {
    const dialogRef = this.dialog.open(AddAdvertisementComponent, {
      data: {ad: null},
      height: '80%',
      width: '50%'
    });

    dialogRef.afterClosed().subscribe(_=> {
      this.getAds();
    });

  }

}
