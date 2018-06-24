
import { OrderDetails } from './orderdetails';
import { status } from './status';
export class Order {
id: string;
submissionDate: Date;
expectedDeliveryDate: Date;
totalQuantity: number;
amount: number;
deliveryStatus: status;
  urgency: number;
  clientId: number;
  clientName: string;
  contactNo: string;
  sex: string;
  regDate: string;
  ageRange: string;
  orderDetails: OrderDetails[];
  address: string;
  tax: number;
  total: number;
  constructor(){}
    coupon: string;
  paid: number;
  gstNo: string;
  igst: number;
}
