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
import {ServiceInterface} from "./serviceInterface";
import {Cinema} from "../../model/cinema";
import {Resource} from "@lagoshny/ngx-hateoas-client";

@Injectable({
  providedIn: 'root'
})
export class AdminListService {
  private adminList: Array<AdminList>;
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
    this.adminList = new Array<AdminList>();
    this.serviceList = new Array<ServiceInterface>();

    this.serviceList.push(cinemaService,cinemaHallService)//, filmService, advertisementService, )

    const cinema:AdminList = new AdminList();
    cinema.name = "cinema"
    cinema.addLink = "/admin/add-cinema"
    cinema.service = this.cinemaService;

    const cinemaHall: AdminList = new AdminList();
    cinemaHall.name = "cinema hall"
    cinemaHall.addLink = "/admin/add-cinema-hall"
    cinemaHall.service = this.cinemaHallService;

    const film: AdminList = new AdminList();
    film.name = "film"
    film.addLink = "/admin/add-film"
    this.filmService.getFilms().subscribe(f => film.objectList = f.resources);

    const ad: AdminList = new AdminList();
    ad.name = "advertisement"
    ad.addLink = "/admin/add-advertisement"
    this.advertisementService.getAds().subscribe(a => ad.objectList = a);

    const promo: AdminList = new AdminList();
    promo.name = "promo offer"
    promo.addLink = "/admin/add-promo-offer"
    this.promoOfferService.getOffers().subscribe(p => promo.objectList = p);

    const segment: AdminList = new AdminList();
    segment.name = "client segment"
    segment.addLink = "/admin/add-client-segment"
    this.clientSegmentService.getSegments().subscribe(s => segment.objectList = s);

    const type: AdminList = new AdminList();
    type.name = "product type"
    type.addLink = "/admin/add-product-type"
    this.productTypeService.getTypes().subscribe(t => type.objectList = t);

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

  a (resource:any) {
    resource.child
  }


}
