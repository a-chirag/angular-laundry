import { Client } from '../client';
import { ClientService } from '../client.service';
import { OrdersService } from '../orders.service';
import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.css']
})
export class ClientsComponent implements OnInit, AfterViewInit {
  sex = [
    {value: '0', viewValue: 'Male'},
    {value: '1', viewValue: 'Female'}
  ];
displayedColumns = ['clientId',
    'fullname',
'contactNo',
'sex',
'address','addOrder'];
  dataSource: any;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }
  constructor(private clientService: ClientService) { }

  ngOnInit() {
    this.getClients();
    this.dataSource = new MatTableDataSource<Client>();
  }
   ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
     this.dataSource.sort = this.sort;
  }
  getClients(): void {
  this.clientService.getClients().subscribe(clients => this.dataSource.data = clients);
}

}
