import { Client } from '../client';
import { ClientService } from '../client.service';
import { Cloth } from '../cloth';
import { OrderAdd } from '../order-add';
import { OrderDetails } from '../orderdetails';
import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { FormControl } from '@angular/forms';
import { MatSort, MatTableDataSource } from '@angular/material';
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
    {value: '0', viewValue: 'Laundry'},
    {value: '1', viewValue: 'Dry Cleaning'},
    {value: '2', viewValue: 'Ironing'}
  ];
  constructor(private clientService: ClientService) { this.clientService.getClothes().subscribe(clothes => this.options = clothes); }

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
    this.orderdetails.amount = this.cloth.drycleanRate * this.orderdetails.quantity;
    this.order.orderDetails.push(this.orderdetails);
    this.dataSource.data = this.order.orderDetails;
    this.order.amount = 0;
    this.order.orderDetails.forEach(item => this.order.amount += item.amount);
    this.order.totalQuantity = 0;
    this.order.orderDetails.forEach(item => this.order.totalQuantity += item.quantity);
    this.orderdetails = new OrderDetails();
    this.cloth = new Cloth();
  }
  submitOrder(): void {
    this.clientService.postOrder(this.order).subscribe(data => console.log(data));
  }
}
