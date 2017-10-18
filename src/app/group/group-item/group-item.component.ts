import { Component, Input , OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { NgForm, FormControl, FormGroup } from '@angular/forms';
import { Location } from '@angular/common';
import 'rxjs/add/operator/switchMap';

import { Group } from '../group'; 
import { User } from '../../user/user';
import { ConfigService } from '../../config.service';

@Component({
  selector: 'app-group-item',
  templateUrl: './group-item.component.html',
  styleUrls: ['./group-item.component.css']
})
export class GroupItemComponent implements OnInit {
 url = '';
 groupName: string;
 userName: string;
 selectedUserName: string;


 
  @Input() group: Group;
  @Input() users: User[];
  @Input() username: User;
  @Input() groups: Group[];




  constructor(
        private route: ActivatedRoute,
        private location: Location,
        private httpClient: HttpClient,
        private fromConfig: ConfigService
  ) { }

  ngOnInit() {
    this.url = this.fromConfig.urlServer.valueOf();
  }

  onAddUser() {
  console.log('prideti')
    }

    addUser(form: NgForm) {
      const formGroupUsers = new FormGroup({
        groupName: new FormControl(form.value.groupname),
        userName: new FormControl(form.value.username)
      });
  
      var groupname = this.group.name;
      var username = form.value.username;

      this.httpClient.post('http://' + this.url + '/group/addUser', JSON.stringify({groupname, username}), {responseType: 'text'})
      .subscribe(
        data=> {
          // username = data.valueOf();
          console.log('username: ', username, 'was added');
     //this push username to selected group(in group.ts was changed constructor -> usernames: String[])     
      this.group.usernames.push(username);
      let length = this.group.usernames.length;
        console.log('new users array: ', this.group.usernames, 'Group:', groupname, 'members are: ', length);
       
        })
         
       
        form.reset();
    }

    onSelectUser(user: string) {
     
      this.selectedUserName = user;
      console.log(user + ' was selected');
      return this.selectedUserName;
    }
  
}
