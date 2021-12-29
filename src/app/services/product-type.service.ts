import {Injectable} from '@angular/core';
import {Observable, of} from "rxjs";
import {ProductType} from "../../model/product-type";

@Injectable({
  providedIn: 'root'
})
export class ProductTypeService {
  private productTypes: Array<ProductType>;

  constructor() {
    this.productTypes = new Array<ProductType>();

    const o1 = new ProductType();
    o1.name = "popcorn";
    o1.unit = "g";
    o1.amount = 100;

    const o2 = new ProductType();
    o2.name = "Cola";
    o2.unit = "ml";
    o2.amount = 500;

    this.productTypes.push(o1, o2);
  }

  public getTypes(): Observable<ProductType[]> {
    return of(this.productTypes)
  }

  public addType(offer: ProductType): Observable<ProductType> {
    this.productTypes.push(offer);
    return of(offer);
  }
}
