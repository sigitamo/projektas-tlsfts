import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-adminpanel',
  templateUrl: './adminpanel.component.html',
  styleUrls: ['./adminpanel.component.css']
})
export class AdminpanelComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    
  }

  onClickUser(event){
    let groups = document.getElementById("profile").setAttribute("class", "tab-pane");  
    let users = document.getElementById("home");
     
        let att = users.getAttribute("class");
        if (!att.includes("active")) {
          users.setAttribute("class", att + " active");
        }
          console.log(users.getAttribute("class").toString());
  }

  onClickGroup(event) {
    let users = document.getElementById("home").setAttribute("class", "tab-pane");
    let groups = document.getElementById("profile").setAttribute("class", "tab-pane active")
   
  }

}
