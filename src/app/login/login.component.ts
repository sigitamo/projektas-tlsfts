import { Component, OnInit, Injectable } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { ConfigService } from '../config.service'; 
import { Md5 } from 'ts-md5/dist/md5';

import { AuthService } from '../auth.service';

@Injectable()

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
url = '';


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
    
    var passwordHash: string | Int32Array = Md5.hashStr(form.value.password.toString());

    console.log(form);
    var formLogin = {
      username: form.value.username,
      password: passwordHash
    }
    this.httpClient.post('http://' + this.url + ':8080/login',
    JSON.stringify(formLogin), {responseType: 'text'})
    .subscribe( data => {
      console.log(data);
      this.authService.sessionData = "thisLohin";
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
