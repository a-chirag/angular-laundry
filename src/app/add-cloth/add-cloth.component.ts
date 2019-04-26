import { ClientService } from '../client.service';
import { Cloth } from '../cloth';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-cloth',
  templateUrl: './add-cloth.component.html',
  styleUrls: ['./add-cloth.component.css']
})
export class AddClothComponent implements OnInit {
  clothDetails: Cloth;
  category = [
    {value: '1', viewValue: 'Apparel Men'},
    {value: '2', viewValue: 'Apparel Women'},
    {value: '3', viewValue: 'Household Item'},
    {value: '4', viewValue: 'Weight'}
  ];

  constructor(private clientService: ClientService, private router: Router) { }

  ngOnInit() {
    this.clothDetails = new Cloth();
  }
  submitCloth(): void {
    this.clientService.postCloth(this.clothDetails).subscribe(data => {console.log(data); this.router.navigate(['/']);});

  }

}
