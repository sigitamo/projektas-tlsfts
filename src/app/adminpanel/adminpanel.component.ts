import { Component, OnInit } from '@angular/core';

import { UserComponent } from '../user/user.component';

@Component({
  selector: 'app-adminpanel',
  templateUrl: './adminpanel.component.html',
  styleUrls: ['./adminpanel.component.css']
})
export class AdminpanelComponent implements OnInit {

  constructor(private fromUser: UserComponent) { }

  ngOnInit() {
    let users = document.getElementById("userpane").setAttribute("class", "active");
    let userTab = document.getElementById("user-tab").setAttribute("class", "nav-link active");
    
  }

  onClickUser(event){
 
    let groups = document.getElementById("grouppane").setAttribute("class", "tab-pane");  
    let groupTab = document.getElementById("group-tab").setAttribute("class", "nav-link");
    let users = document.getElementById("userpane");
    let userTab = document.getElementById("user-tab").setAttribute("class", "nav-link active");
     
        let att = users.getAttribute("class");
        if (!att.includes("active")) {
          users.setAttribute("class", att + " active");
        }
    console.log(users.getAttribute("class").toString());
    this.fromUser.getUsers();
    this.fromUser.getGroups();
    // window.location.reload(true);
    
  }

  onClickGroup(event) {
    let users = document.getElementById("userpane").setAttribute("class", "tab-pane");
    let userTab = document.getElementById("user-tab").setAttribute("class", "nav-link"); 
    let groups = document.getElementById("grouppane").setAttribute("class", "tab-pane active");
    let groupTab = document.getElementById("group-tab").setAttribute("class", "nav-link active");
   
  }

}
