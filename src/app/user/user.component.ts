import { Component, OnInit } from '@angular/core';

import { User } from './user';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})

export class UserComponent implements OnInit {
  users = USERS;
  
  selectedUser: User;

  onSelect(user: User): void {
    this.selectedUser = user;
  }


  constructor() { }

  ngOnInit() {
  }

}

const USERS: User[] = [
  {id: 11, name: 'Inga'},
  {id: 12, name: 'Milda'},
  {id: 13, name: 'Tadas'},
  {id: 14, name: 'Linas'},
  {id: 15, name: 'Kostas'}
]