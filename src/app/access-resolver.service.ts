import { Injectable } from '@angular/core';

@Injectable()
export class AccessResolverService {

  constructor() { }

  delivery(url: string): boolean {
    const orderreg = new RegExp(/\/orders\/\d+/g);
    if (url == '/pendingDelivery') {
      return true;
    } else if (url.search(orderreg) != -1) {
      return true;
     } else {
      return false;
    }
  }
  staff(url: string): boolean {
    if (url == '/settings' || url == '/manageUser' || url == '/addUser' ) {
      return false;
    } else {
      return true;
    }
  }

}
