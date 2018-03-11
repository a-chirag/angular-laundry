import { HttpHeaders } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class AuthService {

  constructor(private http: HttpClient) { }
    login(username, password: string) {
        let body = 'username=' + username + '&password=' + password;
        let headers = new HttpHeaders();
        headers = headers.append('Content-Type', 'application/x-www-form-urlencoded');
        let options = {headers: headers};
        
        return this.http.post<any>('/api/login',body,options).map(user => {
          if (user) {
            localStorage.setItem('currentUser', JSON.stringify({value: user, timestamp: new Date().getTime()}));
          }
        });
        }

    logout() {
        // remove user from local storage to log user out
      this.http.post<any>('/api/logout', null).subscribe();
        localStorage.removeItem('currentUser');
    }
}
