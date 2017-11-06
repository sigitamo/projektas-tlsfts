import { Component, Input, Output, OnInit, EventEmitter } from '@angular/core';
import { NgForm, FormGroup, FormControl } from '@angular/forms';
import { HttpClient, HttpParams, HttpErrorResponse} from '@angular/common/http';
import { Subject } from 'rxjs/Subject';

import { Group } from '../group/group';
import { User } from '../user/user';
import { ConfigService } from '../config.service';


@Component({
    selector: 'app-child-two',
    templateUrl: 'childTwo.component.html',
    styleUrls: ['childTwo.component.css']
})

export class ChildTwoTwoComponent implements OnInit {

    selectedGroupName: any;
    url = '';
    changed = false;
    group: any;
    user: any;
    usernames: any;
    usersChanged = new Subject<ChildTwoTwoComponent[]>();

    @Input() users: any;
    @Input() groups: any;
    @Output() onChangedGroup: EventEmitter<any> = new EventEmitter<any>() 
   
    constructor (
            private httpClient: HttpClient,
            private fromConfig: ConfigService) { }

    ngOnInit() {
        this.url = this.fromConfig.urlServer.valueOf();
        
        console.log(this.getMatch(this.array1, this.array2)); 
        // console.log(this.getMatch(this.grusernames, this.ususernames)); 
        
           

        
    }

 
    onChangeGroup() {
        this.onChangedGroup.emit(this.group);
        console.log('turėtų vykti emitas');
        this.changed = true;
    }

    onSelectGroup(groupname: String) {
        this.selectedGroupName = groupname;
        this.groups.forEach(group => {
            if (group.name == groupname) {
                //Egliaus - sukuriamas objektas group, kad vėliau būtų galma push(username) metode addGroup()
                this.group = group;
            }
        });
        console.log('Group', groupname + ' was selected');
        return this.selectedGroupName;
    }

    onUser(index: number) {
            this.user = this.users[index];
            console.log('selecetd username: ', this.user);
            
        //    this.userGetGroups(); 
           return this.user;
            
    }

    userGetGroups() {
        let index: number;
        this.users.forEach(user => {
        this.httpClient.get('http://' + this.url + '/user/getGroups', {
            params: new HttpParams().set('username', user.username)            
        })
            .subscribe(
                data=> {
                    // return user.groups = data;
                    user.groups = data;
                    console.log('User:', user);
                }
            )
       });
    }

    addGroup(form: NgForm) {
        
        console.log('this will be addGroup to User');
        const formGroupUsers = new FormGroup({
            groupName: new FormControl(form.value.groupname),
            userName: new FormControl(form.value.username)
            });
            //   Egliaus pakeitimas
            var groupname = this.selectedGroupName;
           
            var username = this.user.username;

          this.httpClient.post('http://' + this.url + '/groupmember', 
          null, {
            params: new HttpParams().set('username', username).append("groupname", groupname),
            responseType: 'text'
          })
            .subscribe(
              data=> {
                 
                console.log('group: ', groupname, 'was added to User:', username);
              
                // 3 variantas Egliaus patobulintas
                this.group.usernames = [];
                if(this.group.usernames) {
                    this.group.usernames.push(username);
                    this.group.members += 1;
                    console.log('pavyko. vartotojų sąrašas dabar: ', this.group.usernames);
                } else {
                    
                    console.log('nerandu ką pushinti į:', this.group.usernames);
                }
                
            });
          form.reset();
             this.userGetGroups(); 

    }

    onDelete(index: number) {
        var username = this.users[index].username.valueOf();  

        console.log('This', username, ' will be deleted');

        this.httpClient.delete('http://' + this.url + '/user', {
          params: new HttpParams().set('username', username)
        })
            .subscribe(
                resp => {
                    this.users.splice(index, 1);
                    this.usersChanged.next(this.users.slice());
                    console.log(this.users, 'onDelete procese');
                        if (resp !instanceof HttpErrorResponse) {
                            console.log('error resp: ', resp)
                    }
                    console.log('user', username, 'was deleted;');
                }
            )
    }

    onModalClick(index: number) {
        var modalOpen = document.getElementById("userModal" + index).setAttribute("class", "show");
        console.log('turn on UserMODAL - set Atribute show');
    }

    onNo(index: number) {
        var closeModal = document.getElementById("userModal" + index).setAttribute("class", "hide");
        console.log('turn off UserModal - set Attribute hide');
    }

    array1 = ["Lukas", "Marta"];
    array2 = ["admin", "user", "Lukas"];
    // grusernames = this.group.usernames;
    // ususernames = this.users.usernames;
    getMatch(a, b) {
        let matches = [];

        for ( var i = 0; i < a.length; i++ ) {
            for ( var e = 0; e < b.length; e++ ) {
                if ( a[i] === b[e] ) matches.push( a[i] );
            }
        }
        return matches;
    }


}