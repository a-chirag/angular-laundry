import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import {Order} from '../order';
import { OrdersService } from '../orders.service';
import {MatTableDataSource, MatPaginator, MatSort} from '@angular/material';
@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit, AfterViewInit {
  displayedColumns = ['id',
    'clientname',
'submissionDate',
'expectedDeliveryDate',
'totalQuantity',
'amount',
'deliveryStatus'];
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
  this.ordersService.getOrders().subscribe(orders => this.dataSource.data = orders);
}
}
