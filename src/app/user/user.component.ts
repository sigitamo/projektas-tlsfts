import { Component, Input, OnInit, Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Router, ParamMap } from '@angular/router';
import { Subject } from 'rxjs/Subject';


import { User } from './user';
import { Group } from '../group/group';
import { ConfigService } from '../config.service';
import { UserService } from './user.service';

@Injectable()

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})

export class UserComponent implements OnInit {
  users: any;
  user: string;
  groups: any;
  url = '';
  index: number;
  selectedUser: User;
  selectedGroup: Group;
  // groupname: string;
  groupsChanged = new Subject<UserComponent[]>();


  constructor(
        private fromConfig: ConfigService,
        private httpClient: HttpClient,
        private userService: UserService,
        private router: Router
        ) { }

    ngOnInit() {
      this.getGroups();
      this.getUsers();
    }
 
    getGroups() {
      this.url = this.fromConfig.urlServer.valueOf();
    
      this.httpClient.get('http://' + this.url + '/groups')
      .subscribe(
        data => {
          this.groups = data;
          console.log('groups array - ', this.groups);
        });
    }

    getUsers() {
      this.url = this.fromConfig.urlServer.valueOf();
      this.httpClient.get('http://' + this.url + '/users')
      .subscribe(
        data => {
          this.users = data;
          console.log('this is users from usercomponent: ', this.users);
          }, 
        (err: HttpErrorResponse) => {
          if(err.error instanceof Error) {
            console.log('An error: ', err.error.message);
          } else {
            console.log(`Backend returned code:  ${err.status}, body was: ${err.error}`);
          }
        });
    }

    onSelect(user: User): void {
    this.selectedUser = user;
    console.log('user: ', this.selectedUser.username, ' was selected');
    }

    trackByName(index, user) {
        return user.username;
      }

    onSelectGroup(name: any): void {
      
      console.log('group Name is: ', name);
    }
  
  
}

