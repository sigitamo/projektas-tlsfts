import { Component, OnInit, Input } from '@angular/core';
import { HttpClient, HttpParams, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { FormArray } from '@angular/forms';
import { Subject } from 'rxjs/Subject';


import { ActivatedRoute, Router } from '@angular/router';


import { ConfigService } from '../config.service';

@Component({
  selector: 'app-grouplist',
  templateUrl: './grouplist.component.html',
  styleUrls: ['./grouplist.component.css']
})


export class GrouplistComponent implements OnInit {
  
  // @Input() reload:boolean = false;

  url = '';
  groups: any;
  groupName: string;
  dataToggle: boolean;
  groupsChanged = new Subject<GrouplistComponent[]>();

  constructor(
        private fromConfig: ConfigService,
        private httpClient: HttpClient,
        private route: ActivatedRoute,
        private router: Router 
  ) { }

  ngOnInit() {
    // this.route.params.subscribe(reload => {
    //   console.log("ayyy value changed");
    // })
    
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

     
  }

  trackByName(index, group) {
    return group.name;
  }

// onDelete(index: number ) {
//   this.httpClient.delete('http://' + this.url + '/groups', this.groups.index);
// }
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

      }
      console.log('delete', groupName);
    }
  );

  
}
 
  // this.route.params
  // .subscribe(
  //   param =>
  //   {let id = param['id'] }
  // );
  //  this.groupsChanged.next();





}
