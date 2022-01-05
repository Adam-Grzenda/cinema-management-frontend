import {Injectable} from '@angular/core';
import {Observable, of} from "rxjs";
import {ProductType} from "../../model/product-type";
import {GenericService} from "./generic-service";

@Injectable({
  providedIn: 'root'
})
export class ProductTypeService extends GenericService<ProductType> {

}
