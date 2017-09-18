import { Component, OnInit, Injectable } from '@angular/core';
import { NgForm, FormGroup, Validators, FormControl, EmailValidator } from '@angular/forms';
import { HttpClient, HttpParams, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';
import { Md5 } from 'ts-md5/dist/md5';

import { ConfigService } from '../config.service';
import {  AuthService } from '../auth.service';

@Injectable()

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css'],

})

export class RegistrationComponent implements OnInit {
  url = ''; 
  // httpRes = this.httpResponse;
  
  constructor(
        private httpClient: HttpClient,
        private fromConfig: ConfigService,
        private router: Router,
        private authService: AuthService
        // private httpResponse: HttpResponse<string>
  ) { }

  ngOnInit() {
    //this.url = '10.20.0.184';
    this.url = this.fromConfig.urlServer.valueOf();
    // console.log(this.url);
  }

  onRegistered(form: NgForm) {
    console.log('SUBMIT');
    const formUser = new FormGroup({
      username: new FormControl(form.value.username, [Validators.required, Validators.minLength(3), Validators.maxLength(45)]),
      firstname: new FormControl (form.value.firstname, Validators.minLength(3)),
      lastname: new FormControl(form.value.lastname, Validators.minLength(3)),
      phonenumber: new FormControl(form.value.phonenumber, Validators.minLength(8)),
      email: new FormControl(form.value.email, [Validators.required,Validators.email]),
      password: new FormControl(form.value.password, Validators.minLength(6)),
      passwordConfirm: new FormControl(form.value.passwordConfirm, Validators.minLength(6))
    }, passwordMatchValidator);
    function passwordMatchValidator(g: FormGroup) {
      return g.get('password').value === g.get('passwordConfirm').value ? null : {'mismatch': true};
  }
    var passwordHash: string | Int32Array = Md5.hashStr(formUser.value.password.toString());
    // const username = form.value.username;
    // const firstname = form.value.firstname;
    // const lastname = form.value.lastname;
    // const phonenumber = form.value.phonenumber;
    // const password = form.value.password;
    console.log(formUser);

    var formData  = {
      username : formUser.value.username,
      name : formUser.value.firstname,
      surname : formUser.value.lastname,
      password : passwordHash,
      phone : formUser.value.phonenumber,
      email: formUser.value.email
    }


    this.httpClient.post('http://' + this.url + ':8080/register',
      JSON.stringify(formData), {responseType: 'text'})
      .subscribe(
        data => {
          console.log(data);
          this.authService.sessionData = "!";
          this.router.navigate(['/map']);
        },
        (err: HttpErrorResponse) => {
            console.log({err});
            if({err}){
              this.router.navigate(['/error']);
            }             
        }
       
      )
      
  }

 
}
