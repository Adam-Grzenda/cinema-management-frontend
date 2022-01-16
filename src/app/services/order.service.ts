import { Injectable } from '@angular/core';
import {Order} from "../../model/order/order";
import {Observable} from "rxjs";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {PlacedOrder} from "../../model/order/placedOrder";
import {OrderProductCalculation} from "../../model/order/orderProductCalculation";
import {OrderStateRequest} from "../../model/order/order-state-request";

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(
    private http: HttpClient
  ) { }

  public placeOrder(order: Order): Observable<PlacedOrder> {
    let headers: HttpHeaders = new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.post<PlacedOrder>(
      environment.apiEndpoint + "/placeOrder", order, {headers}
    )
  }

  public calculateOrder(order: Order): Observable<Array<OrderProductCalculation>> {
    let headers: HttpHeaders = new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.post<Array<OrderProductCalculation>>(
      environment.apiEndpoint + "/calculateOrder", order, {headers}
    )
  }

  public updateState(request: OrderStateRequest) {
    let headers: HttpHeaders = new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.post<PlacedOrder>(
      environment.apiEndpoint + "/updateOrderState", request, {headers}
    )
  }



}
