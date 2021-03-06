import { Client } from '../client';
import { ClientService } from '../client.service';
import { Cloth } from '../cloth';
import { OrderAdd } from '../order-add';
import { OrderDetails } from '../orderdetails';
import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { FormControl } from '@angular/forms';
import { MatSort, MatTableDataSource } from '@angular/material';
import { Router, ActivatedRoute } from '@angular/router';
import {Observable} from 'rxjs/Observable';
import {startWith} from 'rxjs/operators/startWith';
import {map} from 'rxjs/operators/map';
import {Company} from '../company';
import { CouponService } from '../coupon.service';
import {sprintf} from 'sprintf-js';
import {NotificationService} from "../notification.service";
@Component({
  selector: 'app-add-order',
  templateUrl: './add-order.component.html',
  styleUrls: ['./add-order.component.css']
})
export class AddOrderComponent implements OnInit, AfterViewInit {
client: Client;
  order: OrderAdd;
contactNo: string;
  dataSource: any;
  couponCode: string;
  disc: any;
  companydetails: Company;
  submitDisabled = true;
  cloth: Cloth = new Cloth();
   displayedColumns = ['clothName',
    'amount',
'quantity',
'orderType'
];
  @ViewChild(MatSort) sort: MatSort;
  orderdetails: OrderDetails = new OrderDetails();
  weightdetails: OrderDetails = new OrderDetails();
  filteredOptions: Observable<Cloth[]>;
  myControl = new FormControl();
  options: Cloth[];
  types = [
    {value: '0', viewValue: 'Wash And Fold'},
    {value: '1', viewValue: 'Wash And Iron'},
    {value: '2', viewValue: 'Premium W&F'},
    {value: '3', viewValue: 'Premium W&I'},
    {value: '4', viewValue: 'Dry Cleaning'},
    {value: '5', viewValue: 'Steam Ironing'},
    {value: '6', viewValue: 'Polishing'},
    {value: '7', viewValue: 'Ironing'}
  ];
  urgency = [
  {value: 1, viewValue: 'Normal'},
    {value: 2, viewValue: 'Same Day'},
    {value: 3, viewValue: 'Next Day'}
  ];
  constructor(private route: ActivatedRoute, private clientService: ClientService,private notficationService: NotificationService,private router: Router,private couponService: CouponService) {
    this.clientService.getClothes().subscribe(clothes => this.options = clothes);
  }
  ngOnInit() {
    this.clientService.getCompany().subscribe(company => {this.companydetails = company;
                                                    this.urgency[1].value = 1 + this.companydetails.sameDay / 100;
                                                    this.urgency[2].value = 1 + company.nextDay / 100;
    if(this.route.snapshot.paramMap.get('id')) {
    this.contactNo = this.route.snapshot.paramMap.get('id');
      this.getClient();
   } });
    this.order = new OrderAdd();
    this.order.orderDetails = [];
    this.order.urgency = 1;
    this.filteredOptions = this.myControl.valueChanges
      .pipe(
        startWith<string | Cloth>(''),
        map(value => typeof value === 'string' ? value : value.name),
        map(name => name ? this.filter(name) : this.options.slice())
      );
    this.dataSource = new MatTableDataSource<OrderDetails[]>();

  }
  ngAfterViewInit() {
     this.dataSource.sort = this.sort;

  }
getClient(): void {
  this.clientService.getClient(this.contactNo).subscribe(client => {this.client = client;
                                                            this.order.clientId = client.clientId;
                                                            this.order.expectedDeliveryDate = new Date();
                                                            this.order.expectedDeliveryDate.setDate(this.order.expectedDeliveryDate.getDate()+2)});
}

  filter(name: string): Cloth[] {
    return this.options.filter(option =>
      option.name.toLowerCase().indexOf(name.toLowerCase()) === 0);
  }

  displayFn(cloth?: Cloth): string | undefined {
    return cloth ? cloth.name : undefined;
  }
  addWeight(): void {
    this.cloth = this.options.filter(option =>
      option.name.toLowerCase().indexOf('weight') === 0)[0];
    var iron = this.options.filter(option =>
      option.name.toLowerCase().indexOf('iron weight') === 0)[0];
    this.weightdetails.clothName = this.cloth.name;
        switch (true) {
          case this.weightdetails.orderType == 0 :
            this.weightdetails.amount = this.order.urgency * this.cloth.laundryRate * this.weightdetails.quantity; // w&f
            break;
          case this.weightdetails.orderType == 1:
            this.weightdetails.amount = (this.order.urgency * this.cloth.laundryRate + this.cloth.ironingRate)
                                                                                   * this.weightdetails.quantity; // w&i
            break;
         case this.weightdetails.orderType == 2:
            this.weightdetails.amount = this.order.urgency * this.cloth.drycleanRate * this.weightdetails.quantity; // pw&f
            break;
         case this.weightdetails.orderType == 3:
            this.weightdetails.amount = (this.order.urgency * this.cloth.drycleanRate + this.cloth.ironingRate)
                                                                                    * this.weightdetails.quantity;
            break; // pw&i
         case this.weightdetails.orderType == 7:
            this.weightdetails.amount = (this.order.urgency * iron.ironingRate)
                                                                                    * this.weightdetails.quantity; // ironing
            break;
        }
    this.order.orderDetails.push(this.weightdetails);
    this.dataSource.data = this.order.orderDetails;
    this.order.amount = 0;
    this.order.orderDetails.forEach(item => this.order.amount += item.amount);
    this.order.tax = this.order.amount * 0.18;
    this.order.total = this.order.amount + this.order.tax;
    this.weightdetails = new OrderDetails();
    this.cloth= new Cloth();
  }
  addorder(): void {
    this.submitDisabled = false;
    this.orderdetails.clothName = this.cloth.name;
    if (this.orderdetails.orderType == 4) {
      this.orderdetails.amount = this.order.urgency * this.cloth.drycleanRate * this.orderdetails.quantity;
    } else if (this.orderdetails.orderType == 5 ) {
      this.orderdetails.amount = this.order.urgency * this.cloth.ironingRate * this.orderdetails.quantity;
    } else if (this.orderdetails.orderType == 6 ) {
      this.orderdetails.amount = this.order.urgency * this.cloth.laundryRate * this.orderdetails.quantity;
    } else {
      this.orderdetails.amount = 0;
    }
    if (this.cloth.name.includes('weight') === true) {
        switch (true) {
          case this.orderdetails.orderType == 0 :
            this.orderdetails.amount = this.order.urgency * this.cloth.laundryRate * this.orderdetails.quantity; // w&f
            break;
          case this.orderdetails.orderType == 1:
            this.orderdetails.amount = (this.order.urgency * this.cloth.laundryRate + this.cloth.ironingRate)
                                                                                   * this.orderdetails.quantity; // w&i
            break;
         case this.orderdetails.orderType == 2:
            this.orderdetails.amount = this.order.urgency * this.cloth.drycleanRate * this.orderdetails.quantity; // pw&f
            break;
         case this.orderdetails.orderType == 3:
            this.orderdetails.amount = (this.order.urgency * this.cloth.drycleanRate + this.cloth.ironingRate)
                                                                                    * this.orderdetails.quantity; // pw&i
            break;
        }
    }
    this.order.orderDetails.push(this.orderdetails);
    this.dataSource.data = this.order.orderDetails;
    this.order.amount = 0;
    this.order.orderDetails.forEach(item => this.order.amount += item.amount);
    this.order.tax = this.order.amount * 0.18;
    this.order.total = this.order.amount + this.order.tax;
    this.order.totalQuantity = 0;
    this.order.orderDetails.forEach(item => {
      if (item.clothName !== 'weight') {
      this.order.totalQuantity += item.quantity; }});
    this.orderdetails = new OrderDetails();
    this.cloth = new Cloth();
  }
  removeorder():void {
   this.order.orderDetails.pop();
   this.dataSource.data = this.order.orderDetails;
  }
  applyCoupon(): void {
    this.order.amount=0;
    this.order.orderDetails.forEach(item => this.order.amount += item.amount);
    this.order.tax = this.order.amount * 0.18;
    this.order.total = this.order.amount + this.order.tax;
    this.couponService.applyCoupon(this.couponCode,this.order)
        .subscribe(order => {this.order = order;this.disc = order.discount();this.order.coupon = this.couponCode; },
                    error => console.log(error));
  }
  submitOrder(): void {
    this.submitDisabled = true;
    this.clientService.postOrder(this.order).subscribe(data => {
      this.notficationService.sendNotification(data.id);
      console.log(data); this.router.navigate(['/orders/' + data.id]);
    } );
  }
  urgencyChange(): void {
    this.order.orderDetails = [];
    this.order.amount = 0;
    this.order.tax = 0;
    this.order.total = 0;
    this.order.totalQuantity = 0;
  }
}
