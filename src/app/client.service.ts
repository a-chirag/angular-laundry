import { AddClient } from './addclient';
import { Client } from './client';
import { Cloth } from './cloth';
import { Company } from './company';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import {Order} from './order';
import { OrderAdd } from './order-add';
import { User } from './user';

@Injectable()
export class ClientService {
private clientUrl = 'api/clients';
  private userUrl = 'api/users';
  private clothesUrl = 'api/clothes';
  private clothes: any;
  constructor(private http: HttpClient) {}

  getClients (): Observable<Client[]> {
  return this.http.get<Client[]>(this.clientUrl);
}
getClient (id: string): Observable<Client> {
  return this.http.get<Client>(this.clientUrl + '/' + id);
}
  getCloth (id: string): Observable<Cloth> {
  return this.http.get<Cloth>(this.clothesUrl + '/' + id);
}
  getCompany (): Observable<Company> {
  return this.http.get<Company>('/api/settings');
}
getClothes(): Observable<Cloth[]> {
  if(this.clothes==null){
    this.http.get<Cloth[]>('/api/clothes/all').subscribe(clothes=> this.clothes=clothes);
    return this.http.get<Cloth[]>('/api/clothes/all');
  } else {
    return new Observable<Cloth[]>(observer => {
        observer.next(this.clothes);
        observer.complete();
    })
  }
}
  postOrder(order: OrderAdd): Observable<Order> {
    return this.http.post<Order>('/api/jobs', order);
  }
  postCloth(cloth: Cloth): Observable<Cloth> {
    this.clothes = null;
    return this.http.post<Cloth>('/api/clothes', cloth);
  }
  postClient(client: Client): Observable<Client> {
    return this.http.post<Client>(this.clientUrl + '/', client);
  }
  postAddClient(addclient: AddClient): Observable<AddClient> {
    return this.http.post<AddClient>(this.clientUrl + '/', addclient);
  }
  print(print: any): Observable<any> {
    return this.http.post<any>('/api/print', print);
  }
  getClientId (): Observable<number> {
  return this.http.get<number>(this.clientUrl + '/nextId' );
}
  getClothId (): Observable<number> {
  return this.http.get<number>(this.clothesUrl + '/nextId' );
}
  putClient(client: Client): Observable<Client> {
    return this.http.put<Client>(this.clientUrl, client);
  }
  putCloth(cloth: Cloth): Observable<Cloth> {
    return this.http.put<Cloth>(this.clothesUrl, cloth);
  }
  putCompany(company: Company): Observable<Company> {
    return this.http.put<Company>('/api/settings', company);
  }
  postAddUser(user: User): Observable<User> {
    return this.http.post<User>(this.userUrl + '/add', user);
  }
  getUsers (): Observable<User[]> {
  return this.http.get<User[]>(this.userUrl + '/all');
}
  putUser(user: User): Observable<User> {
    return this.http.put<User>(this.userUrl+'/add', user);
  }

}

