import {Injectable} from '@angular/core';
import {Observable, of} from "rxjs";
import {ProductType} from "../../model/product-type";
import {AbstractService} from "./abstract-service";

@Injectable({
  providedIn: 'root'
})
export class ProductTypeService extends AbstractService<ProductType> {

}
