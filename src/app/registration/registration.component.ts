import { Component, OnInit } from '@angular/core';
import { NgForm, FormGroup } from '@angular/forms';
import { HttpClient, HttpParams } from '@angular/common/http';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
// userForm: FormGroup; - Šis priklausys Validators
results: string[];
 

  constructor(private httpClient: HttpClient) { }

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
    this.httpClient.post('', null, {
      params: new HttpParams().set('input', '123'),
    })
      .subscribe
      (data => {
        this.results = data['results']
      }

      )
    console.log(this.results);
  
    // form.reset();
  }
// čia reikia atlikti validators
  // onRegisteredUser() {
  //   <FormArray>this.userForm.get('users')
  // }
}
