import {Injectable} from '@angular/core';
import {AdminList} from "../../model/admin-list";
import {Observable, of} from "rxjs";
import {CinemaService} from "./cinema.service";
import {CinemaHallService} from "./cinema-hall.service";
import {AdvertisementService} from "./advertisement.service";
import {PromoOfferService} from "./promo-offer.service";
import {ClientSegmentService} from "./client-segment.service";
import {ProductTypeService} from "./product-type.service";
import {FilmService} from "./film.service";
import {GenericService} from "./generic-service";
import {Resource} from "@lagoshny/ngx-hateoas-client";

@Injectable({
  providedIn: 'root'
})
export class AdminListService {

  private adminList: Array<AdminList>;
  private serviceList: Array<GenericService<Resource>>;


  constructor(
    private cinemaService: CinemaService,
    private cinemaHallService: CinemaHallService,
    private filmService: FilmService,
    private advertisementService: AdvertisementService,
    private promoOfferService: PromoOfferService,
    private clientSegmentService: ClientSegmentService,
    private productTypeService: ProductTypeService
  ) {
    this.adminList = new Array<AdminList>();
    this.serviceList = new Array<GenericService<Resource>>();

    this.serviceList.push(cinemaService, cinemaHallService, filmService,
      advertisementService, promoOfferService, clientSegmentService);

    const cinema: AdminList = new AdminList();
    cinema.name = "cinema"
    cinema.addLink = "/admin/add-cinema"
    cinema.editLink = "/admin/edit-cinema"
    cinema.service = this.cinemaService;

    const cinemaHall: AdminList = new AdminList();
    cinemaHall.name = "cinema hall"
    cinemaHall.addLink = "/admin/add-cinema-hall"
    cinemaHall.editLink = "/admin/edit-cinema-hall"
    cinemaHall.service = this.cinemaHallService;

    const film: AdminList = new AdminList();
    film.name = "film"
    film.addLink = "/admin/add-film"
    film.editLink = "/admin/edit-film"
    film.service = this.filmService

    const ad: AdminList = new AdminList();
    ad.name = "advertisement"
    ad.addLink = "/admin/add-advertisement"
    ad.editLink = "/admin/edit-ad"
    ad.service = this.advertisementService

    const promo: AdminList = new AdminList();
    promo.name = "promo offer"
    promo.addLink = "/admin/add-promo-offer"
    promo.editLink = "/admin/edit-promo-offer"
    promo.service = this.promoOfferService

    const segment: AdminList = new AdminList();
    segment.name = "client segment"
    segment.addLink = "/admin/add-client-segment"
    segment.editLink = "/admin/edit-client-segment"
    segment.service = this.clientSegmentService

    const type: AdminList = new AdminList();
    type.name = "product type"
    type.addLink = "/admin/add-product-type"
    type.editLink = "/admin/edit-product-type"
    type.service = this.productTypeService

    this.adminList.push(cinema, cinemaHall, film, ad, promo, segment, type)
  }

  public getList(): Observable<AdminList[]> {
    this.updateLists();
    return of(this.adminList);
  }

  public updateLists(): void {

    for (let i = 0; i < this.serviceList.length; i++) {
      this.serviceList[i].getAll().subscribe(l => this.adminList[i].objectList = l.resources);
    }
  }


}
