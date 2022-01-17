import {Component, OnInit} from '@angular/core';
import {OrderService} from "../../services/order.service";
import {OrderDisplay} from "../../../model/order/order-display";
import {AddFilmComponent} from "../../admin/add-edit/add-film/add-film.component";
import {MatDialog} from "@angular/material/dialog";
import {PaymentComponent} from "../payment/payment.component";

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.css']
})
export class OrderListComponent implements OnInit {

  orderList: Array<OrderDisplay>;


  constructor(
    private orderService: OrderService,
    private dialog: MatDialog,
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

  completePayment(price: number, id: string) {
    const dialogRef = this.dialog.open(PaymentComponent, {
      data: {price: price, orderId: id },
      height: '60%',
      width: '70%'
    });

    dialogRef.afterClosed().subscribe(_ => {
      this.getOrders();
    });
  }
}
