import { Component, Input , Output, OnInit, EventEmitter } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { HttpClient, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { NgForm, FormControl, FormGroup } from '@angular/forms';
import { Location } from '@angular/common';
import 'rxjs/add/operator/switchMap';
import { Subject } from 'rxjs/Subject';

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

  @Output() changeGroup: EventEmitter<any> = new EventEmitter<any>();

  changed = false;

  onClick() {
    this.changeGroup.emit(this.group);
    this.changed = true;
  }

  constructor(
        private route: ActivatedRoute,
        private location: Location,
        private httpClient: HttpClient,
        private fromConfig: ConfigService
  ) { }

  ngOnInit() {
    this.url = this.fromConfig.urlServer.valueOf();
  }

  addUser(form: NgForm) {
    const formGroupUsers = new FormGroup({
      groupName: new FormControl(form.value.groupname),
      userName: new FormControl(form.value.username)
    });
      var groupname = this.group.name;
      var username = form.value.username;

    this.httpClient.post('http://' + this.url + '/groupmember', 
      null, {
        params: new HttpParams().set('username', username).append("groupname", groupname),
        responseType: 'text'
      })
        .subscribe(
          data=> {
            console.log('username: ', username, 'was added');
      
            this.group.usernames.push(username);
            let length = this.group.usernames.length;
            this.group.members = length;
            return length;
          });
      form.reset();
  }

  onSelectUser(user: string) {
    
    this.selectedUserName = user;
    console.log(user + ' was selected');
    return this.selectedUserName;
  }

  onDelete(name: string){
    
    var groupName = this.group.name.valueOf();
    console.log('onDelete name:', name)
    
    this.httpClient.delete('http://' + this.url + '/groupmember', {
        params: new HttpParams().set('username', name).append("groupname", groupName),
        responseType: 'text'
    }).subscribe(
          resp => {
            ////remove member from members.length
            let index = this.group.usernames.indexOf(name);
            this.group.usernames.splice(index, 1);
            this.group.usernames.slice();
            
            ///// goes to output to parent - group.component and remove member from members.length
            this.group.members = this.group.usernames.length;
            this.onClick();
            console.log('name: ', name, ', was deleted');
          }  
      )
  }
  
}
