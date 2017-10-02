import { Component, OnInit } from '@angular/core';
import { NgForm, FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
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
submitted = false;

  constructor(
            private router: Router,
            private httpClient: HttpClient,
            private fromConfig: ConfigService,
            private authService: AuthService) { }

  ngOnInit() {
    this.url = this.fromConfig.urlServer.valueOf();
  }

  loginUser() {
    this.router.navigate(['/map'])
  }
  
  onSubmit(form: NgForm) {
    console.log('SUBMIT');
    this.submitted = true;
        
    const formUser = new FormGroup({
      username: new FormControl(form.value.username),
      password: new FormControl(form.value.password)
    });
    let passwordHash: string | Int32Array = Md5.hashStr(form.value.password.toString());

    console.log(form);
    var formLogin = {
      grant_type: 'password',
      username: formUser.value.username,
      password: formUser.value.password
    }
    var reqHeaders = {
      'postman-token' : '09a68fc6-4ab8-cc0e-18fe-119861f6facb',
      'cache-control' : 'no-cache',
      'content-type' : 'application/x-www-form-urlencoded'
    }

    this.httpClient.post('http://web-app:secret@' + this.url + '/oauth/token',
      JSON.stringify(formLogin), { headers: new HttpHeaders(reqHeaders), responseType: 'text'})
       .subscribe( data => {
         console.log(data);
        this.authService.sessionData = "thisLohin";
        this.router.navigate(['/map']);
      },
        (err: HttpErrorResponse) => {
          console.log({err});
            if(err.status === 409){
                this.eroorMessageRecieve = true;
                this.errorMessage = 'Neteisingai Įvestas vartotojo vardas arba slaptažodis';
            } else  {
                this.eroorMessageRecieve = true;
                this.submitted = false;
                this.errorMessage = 'Sisteminė klaida. Bandykite jungtis vėliau';
            } 
              console.log(err.status, err.statusText, err.error, this.errorMessage);
        }
      )
  }

     errorM() {
       if(this.eroorMessageRecieve) {
         return this.errorMessage;
       }
     }

}
