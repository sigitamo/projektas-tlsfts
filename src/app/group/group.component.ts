import { Component, OnInit, Inject } from '@angular/core';
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
  group: any;
  groupsChanged = new Subject<GroupComponent[]>();
  length: any;
  groupDeleted: boolean = false;

  onChangeGroup(event) {
    console.log('event received:', event);
    var index;
    this.groups.forEach(grp => {
      if (grp.name == event.name) {
        index = this.groups.indexOf(grp);
      }
    });
    this.groups[index] = event;
  }

  constructor(
        private httpClient: HttpClient,
        private fromConfig: ConfigService,
        private router: Router,
        private route: ActivatedRoute) { }

  ngOnInit() {
    this.url = this.fromConfig.urlServer.valueOf();

    this.httpClient.get('http://' + this.url + '/groups')
    .subscribe(
        data => {
          this.groups = data;
          console.log('groups array - ', this.groups);
        }, 
        (err: HttpErrorResponse) => {
          if(err.error instanceof Error) {
            console.log('GroupList error: ', err.error.message);
          } else {
            console.log(`GroupList Backend returned code:  ${err.status}, body was: ${err.error}`);
          }
        }
      );

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

      var groupName = form.value.groupName;
      console.log('On submit input value: ',form);
    
    this.httpClient.post('http://' + this.url + '/group', groupName, {responseType: 'text'})
      .subscribe(
        data=> {
          console.log(data);
          //this push new groupName to array without reload
          this.groups.push({name: groupName, members: 0});
      
          console.log('po sukurimo grupes',this.groups, 'length of group', this.groups.length);
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
      
    this.httpClient.delete('http://' + this.url + '/group', {
      params: new HttpParams().set('name', groupName)
    }).subscribe(
        resp => {
          this.groups.splice(index, 1);
          this.groupsChanged.next(this.groups.slice());
          console.log(this.groups);
          if (resp !instanceof HttpErrorResponse) {
              console.log('error resp: ', resp)
          }
          console.log('delete', groupName);
         
          //this hide group-list after delete
         this.groupDeleted = true;
        }
    );
   
  }
 
  getGroup(index: number) {
    //this show group-list
    this.groupDeleted = false;

    var groupName = this.groups[index].name.valueOf();
   
    this.httpClient.get('http://' + this.url + '/group', {
      params: new HttpParams().set('name', groupName)
    }).subscribe(
      data => {
          this.group = <Group>data;
          console.log('getGroup', groupName);
        
          var groupUsernames = this.group.usernames;
          console.log('usernames before foreach: ',this.group.usernames)
          for (var index = 0; index < groupUsernames.length; index++) {
            var username = groupUsernames[index];
            this.length = groupUsernames.length;
          }
          let usernames = groupUsernames;
          console.log('this group users: ', usernames, 'members length: ', this.length);
        }
     );
  }
  
  onClick(index: number) {
    var modalOpen = document.getElementById("groupModal" + index).setAttribute("class", "show");
    console.log('on MODAL - set Atribute show');
  }

  onNo(index: number) {
    var closeModal = document.getElementById("groupModal" + index).setAttribute("class", "hide");
    console.log('of Modal - set Attribute hide');
  }


}

