import { ClientService } from '../client.service';
import { Company } from '../company';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.css']
})
export class CompanyComponent implements OnInit {
  companydetails: Company;

  constructor(private route: ActivatedRoute,private router : Router, private clientService: ClientService) { }

  ngOnInit() {
    this.clientService.getCompany().subscribe(company => this.companydetails = company);
  }
  submitCompany(): void {
    this.clientService.putCompany(this.companydetails).subscribe(data => {console.log(data); this.router.navigate(['/']); });

  }

}
