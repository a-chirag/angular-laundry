import { ClientService } from '../client.service';
import { Cloth } from '../cloth';
import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';

@Component({
  selector: 'app-clothes',
  templateUrl: './clothes.component.html',
  styleUrls: ['./clothes.component.css']
})
export class ClothesComponent implements OnInit,AfterViewInit {
  category = [
    {value: '1', viewValue: 'Apparel Men'},
    {value: '2', viewValue: 'Apparel Women'},
    {value: '3', viewValue: 'Household Item'},
    {value: '4', viewValue: 'Weight'}
  ];
displayedColumns = ['id',
    'categoryId',
'name',
'drycleanRate',
'ironingRate',
'laundryRate'];
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
    this.dataSource = new MatTableDataSource<Cloth>();
  }
   ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
     this.dataSource.sort = this.sort;
  }
  getClients(): void {
  this.clientService.getClothes().subscribe(cloth => this.dataSource.data = cloth);
}
}
