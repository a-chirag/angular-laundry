import { ClientService } from '../client.service';
import { User } from '../user';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit {
  users: User[];

  constructor(public clientService: ClientService, private router: Router) { }

  ngOnInit() {
    this.clientService.getUsers().subscribe(users => this.users = users);
  }
  changeAuthority(selectedUser, role)
  {
    selectedUser.authorities = role;
    this.clientService.putUser(selectedUser).subscribe();
  }

}
