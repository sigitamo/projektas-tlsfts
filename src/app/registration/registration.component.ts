import { Component, OnInit } from '@angular/core';
import { NgForm, FormGroup, Validators, FormControl, EmailValidator } from '@angular/forms';
import { HttpClient, HttpParams, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';
import { Md5 } from 'ts-md5/dist/md5';

import { ConfigService } from '../config.service';
import {  AuthService } from '../auth.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css'],

})

export class RegistrationComponent implements OnInit {
  url = ''; 
  errorMessage = '';
  eroorMessageRecieve = false;
  submitted = false;
  
  
  constructor(
        private httpClient: HttpClient,
        private fromConfig: ConfigService,
        private router: Router,
        private authService: AuthService
  ) { }

  ngOnInit() {
    this.url = this.fromConfig.urlServer.valueOf();
  }

  onSubmit(form: NgForm) {
    console.log('SUBMIT');
    this.submitted = true;

    const formUser = new FormGroup({
      username: new FormControl(form.value.username, [Validators.required, Validators.minLength(3), Validators.maxLength(45)]),
      firstname: new FormControl (form.value.firstname, [Validators.required, Validators.minLength(3)]),
      lastname: new FormControl(form.value.lastname, Validators.minLength(3)),
      phonenumber: new FormControl(form.value.phonenumber, Validators.minLength(8)),
      email: new FormControl(form.value.email, [Validators.required,Validators.email]),
      password: new FormControl(form.value.password, Validators.minLength(6)),
      passwordConfirm: new FormControl(form.value.passwordConfirm, Validators.minLength(6))
    });
   
    let passwordHash: string | Int32Array = Md5.hashStr(formUser.value.password.toString());
  
    console.log(formUser);

    let formData  = {
      username : formUser.value.username,
      name : formUser.value.firstname,
      surname : formUser.value.lastname,
      password : passwordHash,
      phone : formUser.value.phonenumber,
      email: formUser.value.email
    }

    this.httpClient.post('http://' + this.url + '/register',
      JSON.stringify(formData), {responseType: 'text'})
      .subscribe(
        data => {
          console.log('this is data - ', data);
          this.authService.sessionData = "!";
          this.router.navigate(['/map']);
        },
        (err: HttpErrorResponse) => {
            console.log({err});
            if({err}){
              this.eroorMessageRecieve = true;
              this.submitted = false;
              this.errorMessage = 'Sisteminė klaida. Bandykite jungtis vėliau';
               console.log(this.errorMessage);
            }             
        }
      )
  }

  errorM() {
    if(this.eroorMessageRecieve) {
      return this.errorMessage;
    }
  }

 
}
