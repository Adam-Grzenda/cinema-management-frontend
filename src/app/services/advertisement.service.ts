import {Injectable} from '@angular/core';
import {Advertisement} from "../../model/advertisement";
import {AbstractService} from "./abstract-service";

@Injectable({
  providedIn: 'root'
})
export class AdvertisementService extends AbstractService<Advertisement> {

}
