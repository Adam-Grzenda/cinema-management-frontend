import {Component, OnInit} from '@angular/core';
import {OrderService} from "../../services/order.service";
import {OrderDisplay} from "../../../model/order/order-display";

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.css']
})
export class OrderListComponent implements OnInit {

  orderList: Array<OrderDisplay>;


  constructor(
    private orderService: OrderService
  ) {
  }

  ngOnInit(): void {
    this.getOrders();
  }

  getOrders() {
    this.orderService.getOrders().subscribe(o => {
      this.orderList = o;
      console.log(this.orderList);
    })
  }

}
