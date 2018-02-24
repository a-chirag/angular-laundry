import { Component, OnInit, Input, AfterViewInit, ViewChild } from '@angular/core';
import { Order } from '../order';
import { OrderDetails } from '../orderdetails';
import { OrdersService } from '../orders.service';
import { status } from '../status';
import { FormControl } from '@angular/forms';
import { MatTableDataSource, MatSort } from '@angular/material';
import { ActivatedRoute } from '@angular/router';

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
  @ViewChild(MatSort) sort: MatSort;
  constructor(private route: ActivatedRoute,
  private orderService: OrdersService) { }

  ngOnInit() {
    this.getHero();
this.dataSource = new MatTableDataSource<OrderDetails[]>();
  }
  ngAfterViewInit() {
     this.dataSource.sort = this.sort;
  }
getHero(): void {
  const id = this.route.snapshot.paramMap.get('id');
  this.orderService.getOrder(id)
    .subscribe(order => {this.order = order;
    this.dataSource.data = this.order.orderDetails;
    this.submissionDateForm = new FormControl(this.order.submissionDate); } );
}
}
