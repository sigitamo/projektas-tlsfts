import { Component, OnInit } from '@angular/core';
import { NgForm, FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Md5 } from 'ts-md5/dist/md5';

import { ConfigService } from '../config.service'; 
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
url = '';
errorMessage = '';
eroorMessageRecieve = false;

  constructor(private router: Router,
              private httpClient: HttpClient,
            private fromConfig: ConfigService,
            private authService: AuthService) { }

  ngOnInit() {
    this.url = this.fromConfig.urlServer.valueOf();
  }


  loginUser() {
    this.router.navigate(['/map'])
  }
  
  onLogin(form: NgForm) {
    console.log('SUBMIT');
    const formUser = new FormGroup({
      username: new FormControl(form.value.username),
      password: new FormControl(form.value.password)
    });
    let passwordHash: string | Int32Array = Md5.hashStr(form.value.password.toString());

    console.log(form);
    var formLogin = {
      username: formUser.value.username,
      password: passwordHash
    }
    this.httpClient.post('http://' + this.url + '/login',
    JSON.stringify(formLogin), {responseType: 'text'})
    .subscribe( data => {
      console.log(data);
      this.authService.sessionData = "thisLohin";
      this.router.navigate(['/map']);
    },
    (err: HttpErrorResponse) => {
        console.log({err});
        if({err}){
          this.eroorMessageRecieve = true;
          this.errorMessage = 'Neteisingai Įvestas vartotojo vardas arba slaptažodis';
          
          console.log(err.status, err.statusText, err.error, this.errorMessage);
          
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
