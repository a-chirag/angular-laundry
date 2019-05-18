import { Injectable } from '@angular/core';
import {
  HttpEvent, HttpInterceptor, HttpHandler, HttpRequest
} from '@angular/common/http';

import { Observable } from 'rxjs';
import {AuthService} from "../auth.service";

/** Pass untouched request through to the next request handler. */
@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler):
    Observable<HttpEvent<any>> {
    const authToken = AuthService.getToken();
    const authReq = req.clone({
    headers: req.headers.set('Authorization', 'Basic '+authToken)
    });
    return next.handle(authReq);
  }
}
