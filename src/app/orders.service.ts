import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import {Order} from './order';

@Injectable()
export class OrdersService {
private ordersUrl = 'api/jobs';
  constructor(private http: HttpClient) {}

  getOrders (): Observable<Order[]> {
  return this.http.get<Order[]>(this.ordersUrl);
}
  getPendingOrders (): Observable<Order[]> {
  return this.http.get<Order[]>(this.ordersUrl+'/processing');
}
  getPendingDelivery (): Observable<Order[]> {
  return this.http.get<Order[]>(this.ordersUrl+'/delivery');
}
   getUnpaidOrder (): Observable<Order[]> {
  return this.http.get<Order[]>(this.ordersUrl+'/unpaid');
}
getOrder (id: string): Observable<Order> {
  return this.http.get<Order>(this.ordersUrl + '/' + id);
}

deleteOrder (id: string): any {
  return this.http.put<Order>(this.ordersUrl + '/' + id, 3);
}

changeStatus(status: number, id: string): Observable<Order> {
 return this.http.put<Order>(this.ordersUrl + '/' + id, status);
}
  changePaid(paid: number, id: string): Observable<Order> {
 return this.http.put<Order>(this.ordersUrl + '/paid/' + id, paid);
}
  

}
