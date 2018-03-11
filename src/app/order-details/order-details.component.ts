
import { Component, OnInit, Input, AfterViewInit, ViewChild } from '@angular/core';
import { Order } from '../order';
import { OrderDetails } from '../orderdetails';
import { OrdersService } from '../orders.service';
import { QzTrayService } from '../qz-tray.service';
import { status } from '../status';
import { FormControl } from '@angular/forms';
import { MatTableDataSource, MatSort } from '@angular/material';
import { ActivatedRoute } from '@angular/router';
import printJS from 'print-js';
import qz from 'qz-tray';


@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.css']
})

export class OrderDetailsComponent implements OnInit, AfterViewInit {
  dataSource: any;
  order: Order;
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
    {value: '5', viewValue: 'Ironing'},
    {value: '6', viewValue: 'Polishing'}
  ];
  @ViewChild(MatSort) sort: MatSort;
  constructor(private route: ActivatedRoute,
  private orderService: OrdersService,  private qztray: QzTrayService ) { }
  ngOnInit() {
    this.getHero();
this.dataSource = new MatTableDataSource<OrderDetails[]>();
  }
  ngAfterViewInit() {
     this.dataSource.sort = this.sort;
  }
  changeStatus(status: number){
    this.orderService.changeStatus(status, this.order.id).subscribe(order => this.order = order);
  }
getHero(): void {
  const id = this.route.snapshot.paramMap.get('id');
  this.orderService.getOrder(id)
    .subscribe(order => {this.order = order;
    this.dataSource.data = this.order.orderDetails;
    this.submissionDateForm = new FormControl(this.order.submissionDate); } );
}
print() {
  console.log('printing');
  this.qztray.printBarcode('Barcode' , this.order).subscribe(data => console.log(data));
}
  printData() {
    this.qztray.printData('Receipt' , this.order).subscribe(data => console.log(data));
  }
}

