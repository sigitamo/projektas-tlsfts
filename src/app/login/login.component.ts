import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }


  loginUser() {
    this.router.navigate([''])
  }
  onLogin(form: NgForm) {
    console.log('SUBMIT');
    const username = form.value.username;
    const firstname = form.value.firstname;
    const lastname = form.value.lastname;
    const phonenumber = form.value.phonenumber;
    const password = form.value.password;
    console.log(form);
    // form.reset();
  }
}
