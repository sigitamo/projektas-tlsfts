import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { NgForm, FormGroup, FormControl } from '@angular/forms';
import { HttpClient, HttpParams } from '@angular/common/http';


import { ConfigService } from '../config.service';
import { Group } from '../group/group';
import { User } from '../user/user';

@Component({
    selector: 'app-child-one',
    templateUrl: 'childOne.component.html',
    styleUrls: ['childOne.component.css']
})

export class ChildOneOneComponent implements OnInit {
    @Input() group: Group; 
    @Input() usernames;
    @Input() name;
    @Input() groupName;

   
    @Input() users: User[];
    @Input() username: User;
    // @Input() groups: Group[];

    @Output() onChangedUser: EventEmitter<any> = new EventEmitter<any>();
   
    changed = false;
    url = '';
    selectedUserName: string;
    // groupName: string;
    userName: string;

    constructor(
            private httpClient: HttpClient,
            private fromConfig: ConfigService) {}

    ngOnInit() {
        this.url = this.fromConfig.urlServer.valueOf();
    }

    onChangeUser() {
        // this.onChangedUser.next(this.group);
        this.onChangedUser.emit(this.group);
        console.log('turėtų trinti: ');
        this.changed = true;
    }

    onSelectUser(user: string) {
        
        this.selectedUserName = user;
        console.log(user + ' was selected');
        return this.selectedUserName;
      }

    onUsername(index: number) {
        let username = this.usernames[index];
        console.log('selecetd username: ',username);
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

    onDeleteUser(name: string){
        
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
                this.onChangeUser();
                console.log('name: ', name, ', was deleted');
              }  
          )
      }




}
