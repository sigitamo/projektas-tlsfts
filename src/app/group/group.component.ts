import { Component, OnInit } from '@angular/core';
import { NgForm, FormGroup, FormControl } from '@angular/forms';
import { HttpClient, HttpParams, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

import { ConfigService } from '../config.service';
import { Group } from './group';
import { User } from '../user/user';

@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.css']
})
export class GroupComponent implements OnInit {
  url='';
  groups: any;
  users: any;
  groupName: string;
  selectedGroup: Group;
  groupsChanged = new Subject<GroupComponent[]>();

  constructor(
        private httpClient: HttpClient,
        private fromConfig: ConfigService,
        private router: Router,
        private route: ActivatedRoute, 
  ) { }

  ngOnInit() {
    this.url = this.fromConfig.urlServer.valueOf();

    this.httpClient.get('http://' + this.url + '/groups')
    .subscribe(
      data => {
        this.groups = data;
        console.log('this is users - ', this.groups);
      }, 
      (err: HttpErrorResponse) => {
        if(err.error instanceof Error) {
          console.log('GroupList error: ', err.error.message);
        } else {
          console.log(`GroupList Backend returned code:  ${err.status}, body was: ${err.error}`);
        }
      })
      this.httpClient.get('http://' + this.url + '/users')
      .subscribe(
        data => {
          this.users = data;
          console.log('this is users in groups: ', this.users);
        }
      )
  }

  trackByName(index, group) {
    return group.name;
  }

  onSubmit(form: NgForm) {
    const formGroup = new FormGroup({
      groupName: new FormControl(form.value.groupName)
    });

    var groupName = form.value.groupName
    console.log('On submit input value: ',form);
    
    this.httpClient.post('http://' + this.url + '/group', groupName, {responseType: 'text'})
     .subscribe(
       data=> {
         console.log(data);
      //this push new groupName to array without reload
       this.groups.push({name: groupName});
        console.log('po sukurimo grupes',this.groups);
       },
       (err: HttpErrorResponse) => {
        if(err.error instanceof Error) {
          console.log('Group error: ', err.error.message);
        } else {
          console.log(`Groupe error form Backend:  ${err.status}, body was: ${err.error}`);
        }
      });
      form.reset();
  }

  onDelete(index: number ) {
    var groupName = this.groups[index].name.valueOf();
    var groupMembersCount = this.groups[index].members.valueOf();
    console.log('GRUPĖ TURI : ',groupMembersCount, 'NARIŲ');
   if(groupMembersCount == 0) {
    this.httpClient.delete('http://' + this.url + '/group', {
      params: new HttpParams().set('name', groupName)
    }).subscribe(
      resp => {
        this.groups.splice(index, 1);
        this.groupsChanged.next(this.groups.slice());
        console.log(this.groups);
        if (resp !instanceof HttpErrorResponse) {
  
        }
        console.log('delete', groupName);
      }
    );
 
   } else {
    console.log('AR TIKRAI NORITE IŠTRINTI GRUPĘ?');
   }
    
  }

  getGroup(index: number) {
    var groupName = this.groups[index].name.valueOf();
    // var groupUsernames = this.groups[index].usernames;
    this.httpClient.get('http://' + this.url + '/group', {
      params: new HttpParams().set('name', groupName)
    }).subscribe(
      data => {
        this.selectedGroup = <Group>data;
        console.log('getGroup', groupName);
        var groupUsernames = this.selectedGroup.usernames;
        for (var index = 0; index < groupUsernames.length; index++) {
          var username = groupUsernames[index];
          console.log('USERNAMEs', username);
          
        }

      }
    );
   
  }

 

}
