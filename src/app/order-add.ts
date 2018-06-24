import { OrderDetails } from './orderdetails';
export class OrderAdd {
  urgency: number;
  id: string;
submissionDate: Date;
expectedDeliveryDate: Date;
totalQuantity: number;
amount: number;
deliveryStatus: number;
  clientId: number;
  orderDetails: OrderDetails[];
  tax: number;
  total: number;
  coupon: string;
  constructor() {
    this.deliveryStatus = 0;
    this.submissionDate = (new Date());
  }
  discount(): number{
    let disc = this.amount;
    this.orderDetails.forEach(item => disc -= item.amount)
    return -disc;
  }
  actualAmount(): number{
    let amount =0;
    this.orderDetails.forEach(item => amount += item.amount)
    return amount;
  }
}
