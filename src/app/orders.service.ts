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
getOrder (id: string): Observable<Order> {
  return this.http.get<Order>(this.ordersUrl + '/' + id);
}

}
