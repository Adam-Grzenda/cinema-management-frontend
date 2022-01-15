import {Component, Input, OnInit} from '@angular/core';
import {MatDialogRef} from "@angular/material/dialog";
import {BuyTicketComponent} from "../buy-ticket/buy-ticket.component";
import {Order} from "../../../model/order/order";
import {OrderService} from "../../services/order.service";
import {OrderStateRequest} from "../../../model/order/order-state-request";
import {PlacedOrder} from "../../../model/order/placedOrder";

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {

  @Input()
  price: number;

  @Input()
  placedOrder: PlacedOrder;

  constructor(
    private orderService: OrderService,
    private dialogRef: MatDialogRef<BuyTicketComponent>
  ) {
  }

  ngOnInit(): void {
  }

  updateStatus(status: string) {
    let request = new OrderStateRequest();

    request.orderId = this.placedOrder.orderId;
    request.newState = status;

    this.orderService.updateState(request).subscribe(n => {
      console.log(n);
    });

  }

}
