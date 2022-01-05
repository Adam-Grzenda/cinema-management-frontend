import {Injectable} from '@angular/core';
import {Advertisement} from "../../model/advertisement";
import {GenericService} from "./generic-service";

@Injectable({
  providedIn: 'root'
})
export class AdvertisementService extends GenericService<Advertisement> {

}
