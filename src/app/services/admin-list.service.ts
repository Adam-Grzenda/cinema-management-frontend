import {Injectable} from '@angular/core';
import {AdminList} from "../../model/admin-list";
import {Observable, of} from "rxjs";
import {Cinema} from "../../model/cinema";
import {CinemaService} from "./cinema.service";
import {CinemaHallService} from "./cinema-hall.service";
import {AdvertisementService} from "./advertisement.service";
import {PromoOfferService} from "./promo-offer.service";
import {ClientSegmentService} from "./client-segment.service";
import {ProductTypeService} from "./product-type.service";
import {FilmService} from "./film.service";

@Injectable({
  providedIn: 'root'
})
export class AdminListService {
  private adminList: Array<AdminList>;

  constructor(
    private cinemaService: CinemaService,
    private cinemaHallService:CinemaHallService,
    private  filmService:FilmService,
    private advertisementService:AdvertisementService,
    private promoOfferService: PromoOfferService,
    private clientSegmentService:ClientSegmentService,
    private productTypeService:ProductTypeService
  ) {
    this.adminList = new Array<AdminList>();

    const cinema: AdminList = new AdminList();
    cinema.name = "cinema"
    cinema.addLink = "/admin/add-cinema"
    this.cinemaService.getCinemas().subscribe(c => cinema.objectList = c);

    const cinemaHall: AdminList = new AdminList();
    cinemaHall.name = "cinema hall"
    cinemaHall.addLink = "/admin/add-cinema-hall"
    this.cinemaHallService.getHalls().subscribe(c => cinemaHall.objectList = c);

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
    return of(this.adminList);
  }


}
