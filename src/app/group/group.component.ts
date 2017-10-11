import { Component, OnInit } from '@angular/core';
import { NgForm, FormGroup, FormControl } from '@angular/forms';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';


import { ConfigService } from '../config.service';

@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.css']
})
export class GroupComponent implements OnInit {
  url='';
  // reloadParam : boolean = false;

  constructor(
        private httpClient: HttpClient,
        private fromConfig: ConfigService,
        private router: Router 
      ) { }

  ngOnInit() {
    this.url = this.fromConfig.urlServer.valueOf();
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
        //  this.reloadParam = !this.reloadParam;
        // location.reload();
       //this.router.navigate(['/grouplist']);
   
         
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

  

}
