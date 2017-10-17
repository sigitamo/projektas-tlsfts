import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-adminpanel',
  templateUrl: './adminpanel.component.html',
  styleUrls: ['./adminpanel.component.css']
})
export class AdminpanelComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    let users = document.getElementById("home").setAttribute("class", "active");
    let homeTab = document.getElementById("home-tab").setAttribute("class", "nav-link active");
  }

  onClickUser(event){

    let groups = document.getElementById("profile").setAttribute("class", "tab-pane");  
    let profileTab = document.getElementById("profile-tab").setAttribute("class", "nav-link");
    let users = document.getElementById("home");
    let homeTab = document.getElementById("home-tab").setAttribute("class", "nav-link active");
     
        let att = users.getAttribute("class");
        if (!att.includes("active")) {
          users.setAttribute("class", att + " active");
        }
          console.log(users.getAttribute("class").toString());
  }

  onClickGroup(event) {
    let users = document.getElementById("home").setAttribute("class", "tab-pane");
    let homeTab = document.getElementById("home-tab").setAttribute("class", "nav-link"); 
    let groups = document.getElementById("profile").setAttribute("class", "tab-pane active");
    let profileTab = document.getElementById("profile-tab").setAttribute("class", "nav-link active");
   
  }

}
