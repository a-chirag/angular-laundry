import { HttpHeaders } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RequestOptions, RequestOptionsArgs, ResponseContentType , Headers} from '@angular/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthService {

  constructor(private http: HttpClient) { }
    login(username, password: string) {
      let body = username + ':' + password;
      let headers = new HttpHeaders();
      headers= headers.append('Content-Type', 'application/x-www-form-urlencoded');
      headers = headers.set('Authorization','Basic '+btoa(body));
      let options = {
        headers: headers,
        responseType: 'text' as 'json'};
      return new Observable<any>((observer) => {
        this.http.get<any>('/api/user', options).subscribe(data =>  {
          this.http.get<any>('/api/user').map(user => {
            if (user) {
              localStorage.setItem('currentUser', JSON.stringify({value: user, timestamp: new Date().getTime()}));
            }
          }).subscribe(user => {observer.next(1); observer.complete(); });
        });
      });

    }

    logout() {
        // remove user from local storage to log user out
      this.http.post<any>('/api/logout', null).subscribe();
        localStorage.removeItem('currentUser');
    }
}
