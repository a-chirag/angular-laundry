import { Order } from './order';
export class Client {
  clientId: number;
  count: number;
  fullname: string;
  contactNo: string;
  sex: string;
  regDate: string;
  ageRange: string;
  jobOrders: Order;
  address: string;
  lat: number;
  long: number;
}
