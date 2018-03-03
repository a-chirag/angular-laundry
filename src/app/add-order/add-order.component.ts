import { Client } from '../client';
import { ClientService } from '../client.service';
import { Cloth } from '../cloth';
import { OrderAdd } from '../order-add';
import { OrderDetails } from '../orderdetails';
import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { FormControl } from '@angular/forms';
import { MatSort, MatTableDataSource } from '@angular/material';
import { Router } from '@angular/router';
import {Observable} from 'rxjs/Observable';
import {startWith} from 'rxjs/operators/startWith';
import {map} from 'rxjs/operators/map';

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
  cloth: Cloth = new Cloth();
   displayedColumns = ['clothName',
    'amount',
'quantity',
'orderType'
];
  @ViewChild(MatSort) sort: MatSort;
  orderdetails: OrderDetails = new OrderDetails();
  filteredOptions: Observable<Cloth[]>;
  myControl = new FormControl();
  options: Cloth[];
  types = [
    {value: '0', viewValue: 'Wash And Fold'},
    {value: '1', viewValue: 'Wash And Iron'},
    {value: '2', viewValue: 'Premium W&F'},
    {value: '3', viewValue: 'Premium W&I'},
    {value: '4', viewValue: 'Dry Cleaning'},
    {value: '5', viewValue: 'Ironing'},
    {value: '6', viewValue: 'Polishing'}
  ];
  constructor(private clientService: ClientService, private router: Router) {
    this.clientService.getClothes().subscribe(clothes => this.options = clothes); }

  ngOnInit() {
    this.order = new OrderAdd();
    this.order.orderDetails = [];
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
                                                            this.order.id = client.count.toLocaleString();
                                                            this.order.expectedDeliveryDate = new Date(); });
}

  filter(name: string): Cloth[] {
    return this.options.filter(option =>
      option.name.toLowerCase().indexOf(name.toLowerCase()) === 0);
  }

  displayFn(cloth?: Cloth): string | undefined {
    return cloth ? cloth.name : undefined;
  }
  addorder(): void {
    this.orderdetails.clothName = this.cloth.name;
    this.orderdetails.jobOrderId = this.order.id;
    if (this.orderdetails.orderType == 4) {
      this.orderdetails.amount = this.cloth.drycleanRate * this.orderdetails.quantity;
    } else if (this.orderdetails.orderType == 5 ) {
      this.orderdetails.amount = this.cloth.ironingRate * this.orderdetails.quantity;
    } else if (this.orderdetails.orderType == 6 ) {
      this.orderdetails.amount = this.cloth.laundryRate * this.orderdetails.quantity;
    } else {
      this.orderdetails.amount = 0;
    }
    if (this.cloth.name.includes('weight') === true) {
        switch (true) {
          case this.orderdetails.orderType == 0 :
            this.orderdetails.amount = this.cloth.laundryRate * this.orderdetails.quantity; //w&f
            break;
          case this.orderdetails.orderType == 1:
            this.orderdetails.amount = (this.cloth.laundryRate + this.cloth.ironingRate) * this.orderdetails.quantity; //w&i
            break;
         case this.orderdetails.orderType == 2:
            this.orderdetails.amount = this.cloth.drycleanRate * this.orderdetails.quantity; //pw&f
            break;
         case this.orderdetails.orderType == 3:
            this.orderdetails.amount = (this.cloth.drycleanRate + this.cloth.ironingRate) * this.orderdetails.quantity; //pw&i
            break;
        }
    }
    this.order.orderDetails.push(this.orderdetails);
    console.log(this.orderdetails.toString());
    this.dataSource.data = this.order.orderDetails;
    this.order.amount = 0;
    this.order.orderDetails.forEach(item => this.order.amount += item.amount);
    this.order.tax = this.order.amount* 0.18;
    this.order.total= this.order.amount+this.order.tax;
    this.order.totalQuantity = 0;
    this.order.orderDetails.forEach(item => this.order.totalQuantity += item.quantity);
    this.orderdetails = new OrderDetails();
    this.cloth = new Cloth();
  }
  submitOrder(): void {
    this.clientService.postOrder(this.order).subscribe(data => {console.log(data); this.router.navigate(['/orders/' + data.id]); } );
  }
}
