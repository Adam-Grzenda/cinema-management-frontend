import {Component, OnInit, ViewChild} from '@angular/core';
import {PromoOffer} from "../../../../model/promo-offer";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {PromoOfferService} from "../../../services/promo-offer.service";
import {MatDialog} from "@angular/material/dialog";
import {AddPromoOfferComponent} from "../../add-edit/add-promo-offer/add-promo-offer.component";

@Component({
  selector: 'app-promo-offer-table',
  templateUrl: './promo-offer-table.component.html',
  styleUrls: ['./promo-offer-table.component.css']
})
export class PromoOfferTableComponent implements OnInit {

  private offers: Array<PromoOffer>;

  dataSource: MatTableDataSource<PromoOffer>;
  displayedColumns: string[] =
    ['id', 'name', 'discount', 'modify', 'delete'];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private promoOfferService: PromoOfferService,
    private dialog: MatDialog,
  ) {
  }

  ngOnInit(): void {
    this.getOffers();
  }

  private getOffers() {
    this.promoOfferService.getAll().subscribe(o => {
      this.offers = o.resources;

      this.dataSource = new MatTableDataSource<PromoOffer>(this.offers);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })
  }

  delete(offer: PromoOffer) {
    this.promoOfferService.delete(offer).subscribe(o => {
      this.getOffers();
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  modify(offer: PromoOffer): void {
    const dialogRef = this.dialog.open(AddPromoOfferComponent, {
      data: {offer: offer},
      height: '60%',
      width: '50%'
    });

    dialogRef.afterClosed().subscribe(_ => {
      this.getOffers();
    })
  }

  add() {
    const dialogRef = this.dialog.open(AddPromoOfferComponent, {
      data: {offer: null},
      height: '60%',
      width: '50%'
    })

    dialogRef.afterClosed().subscribe(_ => {
      this.getOffers();
    })

  }

}
