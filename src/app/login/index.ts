import {AuthInterceptor} from "./auth-interceptor";
import {HTTP_INTERCEPTORS} from "@angular/common/http";

export const httpInterceptor= [{ provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }];
