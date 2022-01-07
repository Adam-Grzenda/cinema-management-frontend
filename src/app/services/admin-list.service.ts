import {Injectable} from '@angular/core';
import {TypeList} from "../../model/type-list";
import {Observable, of} from "rxjs";
import {CinemaService} from "./cinema.service";
import {CinemaHallService} from "./cinema-hall.service";
import {AdvertisementService} from "./advertisement.service";
import {PromoOfferService} from "./promo-offer.service";
import {ClientSegmentService} from "./client-segment.service";
import {ProductTypeService} from "./product-type.service";
import {FilmService} from "./film.service";
import {ServiceInterface} from "./service-interface";

@Injectable({
  providedIn: 'root'
})
export class AdminListService {

  private adminList: Array<TypeList>;
  private serviceList: Array<ServiceInterface>;


  constructor(
    private cinemaService: CinemaService,
    private cinemaHallService: CinemaHallService,
    private filmService: FilmService,
    private advertisementService: AdvertisementService,
    private promoOfferService: PromoOfferService,
    private clientSegmentService: ClientSegmentService,
    private productTypeService: ProductTypeService
  ) {
    this.adminList = new Array<TypeList>();
    this.serviceList = new Array<ServiceInterface>();

    this.serviceList.push(cinemaService, cinemaHallService, filmService,
      advertisementService, promoOfferService, clientSegmentService, productTypeService)

    const cinema: TypeList = new TypeList();
    cinema.id = 1
    cinema.name = "cinema"
    cinema.addLink = "/admin/add-cinema"
    cinema.editLink = "/admin/edit-cinema"
    cinema.service = this.cinemaService;

    const cinemaHall: TypeList = new TypeList();
    cinemaHall.id = 2
    cinemaHall.name = "cinema hall"
    cinemaHall.addLink = "/admin/add-cinema-hall"
    cinemaHall.editLink = "/admin/edit-cinema-hall"
    cinemaHall.service = this.cinemaHallService;

    const film: TypeList = new TypeList();
    film.id = 3
    film.name = "film"
    film.addLink = "/admin/add-film"
    film.editLink = "/admin/edit-film"
    film.service = this.filmService

    const ad: TypeList = new TypeList();
    ad.id = 4;
    ad.name = "advertisement"
    ad.addLink = "/admin/add-advertisement"
    ad.editLink = "/admin/edit-advertisement"
    ad.service = this.advertisementService

    const promo: TypeList = new TypeList();
    promo.id = 5;
    promo.name = "promo offer"
    promo.addLink = "/admin/add-promo-offer"
    promo.editLink = "/admin/edit-promo-offer"
    promo.service = this.promoOfferService

    const segment: TypeList = new TypeList();
    segment.id = 6;
    segment.name = "client segment"
    segment.addLink = "/admin/add-client-segment"
    segment.editLink = "/admin/edit-client-segment"
    segment.service = this.clientSegmentService

    const type: TypeList = new TypeList();
    type.id = 7;
    type.name = "product type"
    type.addLink = "/admin/add-product-type"
    type.editLink = "/admin/edit-product-type"
    type.service = this.productTypeService

    this.adminList.push(cinema, cinemaHall, film, ad, promo, segment, type)
  }

  public getList(): Observable<TypeList[]> {
    this.updateLists();
    return of(this.adminList);
  }

  public updateLists(): void {

    for (let i = 0; i < this.serviceList.length; i++) {
      this.serviceList[i].getAll().subscribe(l => this.adminList[i].objectList = l.resources);
    }
  }

  public updateList(id: number): void {
    this.serviceList[id].getAll().subscribe(l => this.adminList[id].objectList = l.resources);
  }


}
