import { AddClient } from './addclient';
import { Client } from './client';
import { Cloth } from './cloth';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import {Order} from './order';
import { OrderAdd } from './order-add';

@Injectable()
export class ClientService {
private clientUrl = 'api/clients';
  constructor(private http: HttpClient) {}

  getClients (): Observable<Client[]> {
  return this.http.get<Client[]>(this.clientUrl);
}
getClient (id: string): Observable<Client> {
  return this.http.get<Client>(this.clientUrl + '/' + id);
}
getClothes(): Observable<Cloth[]> {
  return this.http.get<Cloth[]>('/api/clothes/all');
}
  postOrder(order: OrderAdd): Observable<Order> {
    return this.http.post<Order>('/api/jobs', order);
  }
  postClient(client: Client): Observable<Client> {
    return this.http.post<Client>(this.clientUrl + '/', client);
  }
  postAddClient(addclient: AddClient): Observable<AddClient> {
    return this.http.post<AddClient>(this.clientUrl + '/', addclient);
  }
  getClientId (): Observable<number> {
  return this.http.get<number>(this.clientUrl + '/nextId' );
}
}

