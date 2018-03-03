import { ClientService } from '../client.service';
import { Cloth } from '../cloth';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-clothes-details',
  templateUrl: './clothes-details.component.html',
  styleUrls: ['./clothes-details.component.css']
})
export class ClothesDetailsComponent implements OnInit {
  cloth: Cloth;
  id: string;
  category = [
    {value: '1', viewValue: 'Apparel Men'},
    {value: '2', viewValue: 'Apparel Women'},
    {value: '3', viewValue: 'Household Item'},
    {value: '4', viewValue: 'Weight'}
  ];

  constructor(private router : Router, private clientService: ClientService,private route: ActivatedRoute) {
this.id = this.route.snapshot.paramMap.get('id');}

  ngOnInit() {
    this.clientService.getCloth(this.id).subscribe(cloth => this.cloth = cloth);
  }
  
  updateCloth(): void {
    this.clientService.putCloth(this.cloth).subscribe(data => {console.log(data); this.router.navigate(['/']); });

  }

}
