import { Coupon } from './coupon';
import { OrderAdd } from './order-add';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class CouponService {
private couponsUrl = 'api/coupons';
  constructor(private http: HttpClient) { }
getCoupon (code: string): Observable<Coupon> {
  //return new Observable<Coupon>((observer) => {observer.error();observer.complete()});
  return this.http.get<Coupon>(this.couponsUrl + '/' + code);
}
  applyCoupon (code: string, order: OrderAdd) : Observable<OrderAdd> {
    return new Observable<OrderAdd>((observer) => {
        this.getCoupon(code).subscribe(coupon => {
          if (coupon == null) {
            observer.error('No Such Coupon');
            observer.complete();
          } else {
            this.makeDiscount(order, coupon).subscribe(disc => {
              order.amount = order.amount - disc;
              // order.tax = order.amount * 0.18;
              order.total = order.amount;
              observer.next(order);
              observer.complete();
              }, error => {observer.error('Requirements Not met'); observer.complete()});
          }
        }, error => {observer.error('No Such Coupon'); observer.complete()});
    });
  }
  makeDiscount(order: OrderAdd, coupon: Coupon): Observable<number> {
    if (coupon.type == 0) {
      return this.makeDiscType0(order, coupon);
    } else {
      return new Observable<number>((observer) => {observer.error(); observer.complete()});
    }
  }
  makeDiscType0(order: OrderAdd, coupon: Coupon): Observable<number> {
    const d = new Date();
    return new Observable<number>((observer) => {
      if (order.amount >= coupon.minAmount && d <= coupon.expiry) {
        observer.next(Math.min(order.amount*coupon.discValue/100, coupon.maxDisc));
        observer.complete();
      }
      else {
        observer.error();
        observer.complete();
      }
    });
  }
}
