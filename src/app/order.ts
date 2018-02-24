
import { OrderDetails } from './orderdetails';
import { status } from './status';
export class Order {
id: string;
submissionDate: string;
expectedDeliveryDate: string;
totalQuantity: number;
amount: number;
deliveryStatus: status;
  clientId: number;
  clientName: string;
  contactNo: string;
  sex: string;
  regDate: string;
  ageRange: string;
  orderDetails: OrderDetails[];
}
