import { ClientService } from '../client.service';
import { Component, OnInit } from '@angular/core';
import { AddClient } from '../addclient';
import { DatePipe } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-add-client',
  templateUrl: './add-client.component.html',
  styleUrls: ['./add-client.component.css']
})
export class AddClientComponent implements OnInit {
  sex = [
    {value: '0', viewValue: 'Male'},
    {value: '1', viewValue: 'Female'}
  ];
  ageRange = [
    {value: '0', viewValue: 'Below 25'},
    {value: '1', viewValue: '25-40'},
    {value: '2', viewValue: 'Above 40'}
  ];
  clientdetails: AddClient;

  constructor(private clientService: ClientService, private route: ActivatedRoute,
      private router: Router) { }

  ngOnInit() {
    this.clientdetails = new AddClient();
    this.clientdetails.regDate = new Date();
    this.clientdetails.lat = 0;
    this.clientdetails.long = 0;
    this.clientService.getClientId().subscribe(id => this.clientdetails.clientId=id);
  }
  submitClient(): void {
    console.log(this.clientdetails.fullname);
    this.clientService.postAddClient(this.clientdetails).subscribe(data => {console.log(data); this.router.navigate(['/']);});
  }

}
