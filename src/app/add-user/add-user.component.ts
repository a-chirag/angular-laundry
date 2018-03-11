import { ClientService } from '../client.service';
import { User } from '../user';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {
  authorities = [
    {value: 'ROLE_USER', viewValue: 'User'},
    {value: 'ROLE_STAFF', viewValue: 'Staff'},
    {value: 'ROLE_DELIVERY', viewValue: 'Delivery'}
  ];
  userdetails: User;

  constructor(private clientService: ClientService, private router: Router) { }

  ngOnInit() {
    this.userdetails = new User();
    this.userdetails.enabled = true;
  }
  submitUser(): void {
    this.clientService.postAddUser(this.userdetails).subscribe(data => {console.log(data); this.router.navigate(['/manageUser']);});

  }

}
