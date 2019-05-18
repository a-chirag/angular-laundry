
import { Client } from '../client';
import { ClientService } from '../client.service';
import { Component, OnInit, Input, AfterViewInit, ViewChild } from '@angular/core';
import { Order } from '../order';
import { OrderDetails } from '../orderdetails';
import { OrdersService } from '../orders.service';
import { QzTrayService } from '../qz-tray.service';
import { status } from '../status';
import { FormControl } from '@angular/forms';
import { MatTableDataSource, MatSort } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import printJS from 'print-js';
import qz from 'qz-tray';
import {NotificationService} from "../notification.service";


@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.css']
})

export class OrderDetailsComponent implements OnInit, AfterViewInit {
  dataSource: any;
  navigate: string;
  currentLat: any;
  currentLng: any;
  amount: any;
  order: Order;
  disc: boolean;
  client: Client;
  status: status;
  submissionDateForm;
  displayedColumns = ['clothName',
    'amount',
'quantity',
'orderType'
];
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
  @ViewChild(MatSort) sort: MatSort;
  constructor(private route: ActivatedRoute, private clientService: ClientService,private notificationService: NotificationService,
  private orderService: OrdersService,  private qztray: QzTrayService, private router : Router) { }
  ngOnInit() {
    this.getHero();
this.dataSource = new MatTableDataSource<OrderDetails[]>();
  }
  ngAfterViewInit() {
     this.dataSource.sort = this.sort;
  }
  changeStatus(status: number){
    if(status==2){
      this.notificationService.sendDeliveryNotification(this.order.id);
    }
    this.orderService.changeStatus(status, this.order.id).subscribe(order => this.order = order);
  }
  changePaid(){
    if(this.order.paid==0){
      this.order.paid = 1;
    } else {
      this.order.paid =0;
    }
    this.orderService.changePaid(this.order.paid,this.order.id).subscribe(order => this.order = order);
  }
getHero(): void {
  const id = this.route.snapshot.paramMap.get('id');
  this.orderService.getOrder(id)
    .subscribe(order => {
    this.order = order;
    this.dataSource.data = this.order.orderDetails;
    this.submissionDateForm = new FormControl(this.order.submissionDate);
    this.clientService.getClient(this.order.contactNo).subscribe(client => {this.client = client;}); } );
}
print() {
  console.log('printing');
  this.qztray.printBarcode('Barcode' , this.order).subscribe(data => console.log(data));
}
navigation()
  {
  this.navigate = "https://maps.google.com/?q="+this.client.lat+","+this.client.lng;
  window.open(this.navigate, "_blank");
}
cancelOrder()
  {
  this.orderService.deleteOrder(this.order.id).subscribe(this.router.navigate(['/']));
}
  printData() {
    this.qztray.printData('Receipt' , this.order).subscribe(data => console.log(data));
  }
  discount(): number{
    let disc = this.order.amount;
    this.order.orderDetails.forEach(item => disc -= item.amount);
    return -disc;
  }
  actualAmount(): number{
    let amt = 0;
    this.order.orderDetails.forEach(item => {
      this.amount += item.amount;
      amt += item.amount;
    });
    return amt;
  }
  isDisc(): boolean {
    return this.discount()!=0;
  }
  sendNotification(id: string){
    this.notificationService.sendNotification(id);
  }
}

