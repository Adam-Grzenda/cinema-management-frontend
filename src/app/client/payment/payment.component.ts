import {Component, Inject, Injectable, Input, OnInit, Optional} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {BuyTicketComponent} from "../buy-ticket/buy-ticket.component";
import {Order} from "../../../model/order/order";
import {OrderService} from "../../services/order.service";
import {OrderStateRequest} from "../../../model/order/order-state-request";
import {PlacedOrder} from "../../../model/order/placedOrder";
import {Cinema} from "../../../model/cinema";

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {

  @Input()
  price: number;

  @Input()
  orderId: string;

  constructor(
    @Optional()
    @Inject(MAT_DIALOG_DATA) private data: {price: number, orderId: string },
    private orderService: OrderService,
  ) {
  }

  ngOnInit(): void {
    if (this.data) {
      this.price = this.data.price;
      this.orderId = this.data.orderId;
    }
  }

  updateStatus(status: string) {
    console.log(this.orderId)
    let request = new OrderStateRequest();

    request.orderId = this.orderId;
    request.newState = status;

    this.orderService.updateState(request).subscribe(n => {
      console.log(n);
    });

  }

}
