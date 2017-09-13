import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ConfigService } from '../config.service'; 


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
url = '';


  constructor(private router: Router,
              private httpClient: HttpClient,
            private fromConfig: ConfigService) { }

  ngOnInit() {
    this.url = this.fromConfig.urlServer.valueOf();
  }


  loginUser() {
    this.router.navigate(['/map'])
  }
  
  onLogin(form: NgForm) {
    console.log('SUBMIT');
    
    console.log(form);
    var formLogin = {
      username: form.value.username,
      password: form.value. password
    }
    this.httpClient.post('http://' + this.url + ':8080/login',
    JSON.stringify(formLogin), {responseType: 'text'})
    .subscribe()
    // form.reset();
    this.loginUser();
  }
}
