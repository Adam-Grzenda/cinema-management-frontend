import {Injectable} from '@angular/core';
import {Advertisement} from "../../model/advertisement";
import {Observable, of} from "rxjs";
import {FilmService} from "./film.service";
import {A} from "@angular/cdk/keycodes";

@Injectable({
  providedIn: 'root'
})
export class AdvertisementService {
  private ads: Array<Advertisement>;

  constructor(
    private filmService: FilmService,
  ) {
    this.ads = new Array<Advertisement>();

    const a1:Advertisement = new Advertisement();
    a1.companyName = "Coca Cola";
    a1.duration = 30;

    const a2:Advertisement = new Advertisement();
    a2.companyName = "Lego";
    a2.duration = 40;
    this.filmService.getFilm(3).subscribe(f => a2.film = f);


    this.ads.push(a1, a2);
  }

  public getAds(): Observable<Advertisement[]> {
    return of(this.ads)
  }

  public addAdv(advertisement: Advertisement): Observable<Advertisement> {
    this.ads.push(advertisement);
    return of(advertisement);
  }
}
