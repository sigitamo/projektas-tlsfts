import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    //Show only groups
    let groups = document.getElementById("groupDiv").setAttribute("class", "!hide");
    let users = document.getElementById("userDiv").setAttribute("class", "hide");
    //active group-button color
    let groupButt = document.getElementById("groupButt").setAttribute("class", "buttonUserOrGroup")
  }

  onClickGroup(event) {
    //show groups
    let groups = document.getElementById("groupDiv").setAttribute("class", "!hide");
    //active group-button color
    let groupsButton = document.getElementById("groupButt").setAttribute("class", "buttonUserOrGroup");
    //hide users
    let users = document.getElementById("userDiv").setAttribute("class", "hide");
    //non-active user-button color
    let usersButton = document.getElementById("userButt").setAttribute("class", "userAndGroup");
  }

  onClickUser(event) {
    //show users
    let users = document.getElementById("userDiv").setAttribute("class", "!hide");
    //active user-button color
    let usersButton = document.getElementById("userButt").setAttribute("class", "buttonUserOrGroup");
    //hide groups and group-list
    let groups = document.getElementById("groupDiv").setAttribute("class", "hide");
    let groupList = document.getElementById("groupListDiv").setAttribute("class", "hide");
    //non-active group-button
    let groupsButton = document.getElementById("groupButt").setAttribute("class", "userAndGroup");
  }

}
