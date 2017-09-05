import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  onRegistered(form: NgForm) {
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
