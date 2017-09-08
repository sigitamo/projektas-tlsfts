import { Component, OnInit } from '@angular/core';
import { NgForm, FormGroup, Validators, FormControl, EmailValidator } from '@angular/forms';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
 

  constructor(private httpClient: HttpClient) { }

  ngOnInit() {

  }

  onRegistered(form: NgForm) {
    console.log('SUBMIT');
    const formUser = new FormGroup({
      username: new FormControl(form.value.username, Validators.minLength(3)),
      firstname: new FormControl (form.value.firstname, Validators.minLength(3)),
      lastname: new FormControl(form.value.lastname, Validators.minLength(3)),
      phonenumber: new FormControl(form.value.phonenumber, Validators.minLength(8)),
      email: new FormControl(form.value.email, Validators.email),
      password: new FormControl(form.value.password, Validators.minLength(6)),
      passwordConfirm: new FormControl(form.value.passwordConfirm, Validators.minLength(6))
    }, passwordMatchValidator);
    function passwordMatchValidator(g: FormGroup) {
      return g.get('password').value === g.get('passwordConfirm').value ? null : {'mismatch': true};
  }

    // const username = form.value.username;
    // const firstname = form.value.firstname;
    // const lastname = form.value.lastname;
    // const phonenumber = form.value.phonenumber;
    // const password = form.value.password;
    console.log(formUser);

    var formData = {
      username : formUser.value.username,
      name : formUser.value.firstname,
      surname : formUser.value.lastname,
      password : formUser.value.password,
      phone : formUser.value.phonenumber,
      email: formUser.value.email
    }

    this.httpClient.post('http://localhost:8080/register',
      JSON.stringify(formData), {responseType: 'text'})
      .subscribe()
      
      // .toPromise()
      // .then( response => response.json().data as formData[])
      // .catch(this.handleError);
  



    // var messageUser = new Promise(
    //   (resolve, reject) => {
    //     resolve('succes');
    //   });

    //   messageUser.then( value => {
    //     console.log(value);
    //   })
    // form.reset();
  }

  // postUsers(): Promise<formData> {
  //   return this.httpClient.post('http://localhost:8080/users)
  //   .toPromise()
  //     .then( response => response.json().data as formData[])
  //     .catch(this.handleError);
  // }
 
}
