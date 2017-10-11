import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

import { User } from './user';
import { ConfigService } from '../config.service';
import { UserService } from './user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})

export class UserComponent implements OnInit {
  users: any;
  user: string;
  groups: any;
  user_roles: String[];
  url = '';
  results: string[];
  length: number;

  selectedUser: User;

  onSelect(user: User): void {
    this.selectedUser = user;
  }


  constructor(
        private fromConfig: ConfigService,
        private httpClient: HttpClient,
        private userService: UserService,
        private router: Router
        ) { }

  ngOnInit(): void {
    this.url = this.fromConfig.urlServer.valueOf();
    this.httpClient.get('http://' + this.url + '/users')
    .subscribe(
      data => {
        this.users = data;
        console.log('this is users - ', this.users);
        }, 
      (err: HttpErrorResponse) => {
        if(err.error instanceof Error) {
          console.log('An error: ', err.error.message);
        } else {
          console.log(`Backend returned code:  ${err.status}, body was: ${err.error}`);
        }
        
      })

      this.httpClient.get('http://' + this.url + '/groups')
      .subscribe(
        data => {
          this.groups = data;
          console.log('this is groups: ', this.groups);
        }
      )
  }
  
  onDeleteUser() {
    this.userService.deleteUser(this.user);
    this.router.navigate(['/adminpanel']);
  }
  
}

