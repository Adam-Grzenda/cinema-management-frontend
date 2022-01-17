import {TicketDisplay} from "./ticket-display";

export class OrderDisplay {
  orderID: string;
  orderDate: string;
  tickets: Array<TicketDisplay>;
  paymentStatus: string;
  price: number;

}
