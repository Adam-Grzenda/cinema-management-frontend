import {Injectable} from '@angular/core';
import {Advertisement} from "../../model/advertisement";
import {Observable, of} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AdvertisementService {
  private ads:Array<Advertisement>;

  constructor() {
    this.ads = new Array<Advertisement>();
  }

  public getAds(): Observable<Advertisement[]> {
    return of(this.ads)
  }

  public addAdv(advertisement: Advertisement): Observable<Advertisement> {
    this.ads.push(advertisement);
    return of(advertisement);
  }
}
