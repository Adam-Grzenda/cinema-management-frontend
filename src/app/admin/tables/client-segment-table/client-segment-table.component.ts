import {Component, OnInit, ViewChild} from '@angular/core';
import {ClientSegment} from "../../../../model/client-segment";
import {MatTableDataSource} from "@angular/material/table";
import {Advertisement} from "../../../../model/advertisement";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {ClientSegmentService} from "../../../services/client-segment.service";
import {PromoOfferService} from "../../../services/promo-offer.service";
import {MatDialog} from "@angular/material/dialog";
import {PromoOffer} from "../../../../model/promo-offer";
import {AddAdvertisementComponent} from "../../add-edit/add-advertisement/add-advertisement.component";
import {AddClientSegmentComponent} from "../../add-edit/add-client-segment/add-client-segment.component";

@Component({
  selector: 'app-client-segment-table',
  templateUrl: './client-segment-table.component.html',
  styleUrls: ['./client-segment-table.component.css']
})
export class ClientSegmentTableComponent implements OnInit {

  private segments: Array<ClientSegment>;

  dataSource: MatTableDataSource<ClientSegment>;
  displayedColumns: string[] =
    ['id', 'name', 'promo_offer_id', 'modify', 'delete'];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private clientSegmentService: ClientSegmentService,
    private promoOfferService: PromoOfferService,
    private dialog: MatDialog,
  ) {
  }

  ngOnInit(): void {
    this.getSegments();
  }

  private getSegments() {
    this.clientSegmentService.getAll().subscribe(s => {
      this.segments = s.resources;

      for (let seg of this.segments) {
        seg.getRelation<PromoOffer>('promoOffer').subscribe(o => {
            seg.promoOffer = o;
          },
          error => {
          });
      }
      this.dataSource = new MatTableDataSource<ClientSegment>(this.segments);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  delete(segment:ClientSegment) {
    this.clientSegmentService.delete(segment).subscribe(_ => {
      this.getSegments();
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  modify(segment: ClientSegment): void {
    const dialogRef = this.dialog.open(AddClientSegmentComponent, {
      data: {segment: segment},
      height: '80%',
      width: '50%'
    });

    dialogRef.afterClosed().subscribe(_=> {
      this.getSegments();
    });
  }

  add(): void {
    const dialogRef = this.dialog.open(AddClientSegmentComponent, {
      data: {segment: null},
      height: '80%',
      width: '50%'
    });

    dialogRef.afterClosed().subscribe(_=> {
      this.getSegments();
    });
  }

}
