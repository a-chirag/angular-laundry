import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import {Order} from '../order';
import { OrdersService } from '../orders.service';
import { QzTrayService } from '../qz-tray.service';
import {MatTableDataSource, MatPaginator, MatSort} from '@angular/material';
@Component({
  selector: 'app-pending-delivery',
  templateUrl: './unpaid-order.component.html',
  styleUrls: ['./unpaid-order.component.css']
})
export class UnpaidOrderComponent implements OnInit, AfterViewInit {
  displayedColumns = ['id',
    'clientname',
'submissionDate',
'expectedDeliveryDate',
'totalQuantity',
'amount',
'deliveryStatus'];
  types = [
    {value: '0', viewValue: 'Processing'},
    {value: '1', viewValue: 'Delivery'},
    {value: '2', viewValue: 'Completed'},
    {value: '3', viewValue: 'Canceled'}
  ];
  dataSource: any;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }
  constructor(public ordersService: OrdersService, public qztray: QzTrayService) { }

  ngOnInit() {
    this.getOrders();
    this.dataSource = new MatTableDataSource<Order>();
  }
   ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
     this.dataSource.sort = this.sort;
  }
getOrders(): void {
  this.ordersService.getUnpaidOrder().subscribe(orders => this.dataSource.data = orders);
}
changeStatus(status: number,order: Order){
    this.ordersService.changeStatus(status, order.id).subscribe();
  }
}
