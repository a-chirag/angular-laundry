import {AccessResolverService} from './access-resolver.service';
import {Injectable} from '@angular/core';
import {CanActivate, RouterStateSnapshot, ActivatedRouteSnapshot, Router} from '@angular/router';
import {Observable} from 'rxjs';

@Injectable()
export class AuthGuardService implements CanActivate {

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
    boolean | Observable<boolean> | Promise<boolean> {
    if (localStorage.getItem('currentUser')) {
      let user = JSON.parse(localStorage.getItem('currentUser'));
      if (user.authorities[0].authority === 'ROLE_USER') {
        return true;
      } else if (user.authorities[0].authority === 'ROLE_DELIVERY') {
        if (this.access.delivery(state.url)) {
          return true;
        } else {
          this.router.navigate(['/access'], {queryParams: {returnUrl: state.url}});
          return false;
        }
      } else if (user.authorities[0].authority === 'ROLE_STAFF') {
        if (this.access.staff(state.url)) {
          return true;
        } else {
          this.router.navigate(['/access'], {queryParams: {returnUrl: state.url}});
          return false;
        }
      }
    }

    // not logged in so redirect to login page with the return url
    this.router.navigate(['/login'], {queryParams: {returnUrl: state.url}});
    return false;
  }

  constructor(private router: Router, private access: AccessResolverService) {}

}
