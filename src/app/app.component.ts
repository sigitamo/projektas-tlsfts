import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';



  constructor(private router: Router,
  private httpClient: HttpClient) {}


  // onRegistration() {
  //   this.router.navigate(['/registration'])
  // }
}


