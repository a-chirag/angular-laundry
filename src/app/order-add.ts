import { OrderDetails } from './orderdetails';
export class OrderAdd {
  id: string;
submissionDate: Date;
expectedDeliveryDate: Date;
totalQuantity: number;
amount: number;
deliveryStatus: number;
  clientId: number;
  orderDetails: OrderDetails[];
  constructor() {
    this.deliveryStatus = 0;
    this.submissionDate = (new Date());
  }
}
