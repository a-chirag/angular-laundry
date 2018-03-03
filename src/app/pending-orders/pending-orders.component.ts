import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import {Order} from '../order';
import { OrdersService } from '../orders.service';
import { QzTrayService } from '../qz-tray.service';
import {MatTableDataSource, MatPaginator, MatSort} from '@angular/material';

@Component({
  selector: 'app-pending-orders',
  templateUrl: './pending-orders.component.html',
  styleUrls: ['./pending-orders.component.css']
})
export class PendingOrdersComponent implements OnInit, AfterViewInit {
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
    {value: '2', viewValue: 'Completed'}
  ];
  dataSource: any;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }
  constructor(private ordersService: OrdersService) { }

  ngOnInit() {
    this.getOrders();
    this.dataSource = new MatTableDataSource<Order>();
  }
   ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
     this.dataSource.sort = this.sort;
  }
getOrders(): void {
  this.ordersService.getPendingOrders().subscribe(orders => this.dataSource.data = orders);
}
}
