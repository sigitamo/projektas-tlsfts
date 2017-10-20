import { Component, OnInit, Inject } from '@angular/core';
import { NgForm, FormGroup, FormControl } from '@angular/forms';
import { HttpClient, HttpParams, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
// import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

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
  group: any;
  groupsChanged = new Subject<GroupComponent[]>();
  groupChanged = new Subject<Group>();
  text: string;
  length: any;

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
        private route: ActivatedRoute, 
        // public dialog: MatDialog
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
       this.groups.push({name: groupName, members: 0});
      //  this.groupName; - console.log gaunasi undefined
      // this.groups.members - console.log gaunasi undefined


      //  this.groups.push({name: groupName, members: 0});
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
    // var groupMembersCount = this.groups[index].members.valueOf();
    // console.log('GRUPĖ TURI : ',groupMembersCount, 'NARIŲ');
  
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
  }

  getGroup(index: number) {
    var groupName = this.groups[index].name.valueOf();
    // var groupUsernames = this.groups[index].usernames;
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
        console.log('USERNAMEs', usernames, 'members length: ', this.length);
      }
      
    );
   
    
    
  }
  onClick(index: number) {
    var modalOpen = document.getElementById("groupModal" + index).setAttribute("class", "show");
     
    console.log('on MODAL set Atribute show');
  }

  onNo(index: number) {
    var closeModal = document.getElementById("groupModal" + index).setAttribute("class", "hide");
  }


//  openDialog(): void {
//   let dialogRef = this.dialog.open(DialogGroupsText, {
//     width: '250px',
//     data: {text: 'TRINTI'}
//   });

//   dialogRef.afterClosed().subscribe(result => {
//     console.log('The dialog was closed');
//     this.text = result;
//   })
//  }

}


// @Component({
//   selector: 'app-dialog-groups-text',
//   templateUrl: './dialog-groups-text.html'  
// })
// export class DialogGroupsText {
  
    
  
//     constructor(
//         public dialogRef: MatDialogRef<DialogGroupsText>,
//         @Inject(MAT_DIALOG_DATA) public data: any,
//         private groupComponent: GroupComponent) { }
  
//     onNoClick(): void {
//       this.dialogRef.close();
//     }
//     onDelete(index: number): void {
//       this.groupComponent.onDelete(index);
//       console.log(index);
//       this.dialogRef.close();
//     }
  
//   }
