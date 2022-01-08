import { Injectable } from '@angular/core';
import {Order} from "../../model/order";
import {Observable} from "rxjs";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(
    private http: HttpClient
  ) { }

  public placeOrder(order: Order): Observable<Object> {
    let headers: HttpHeaders = new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.post(
      environment.apiEndpoint + "/placeOrder", order, {headers}
    )
  }

}
