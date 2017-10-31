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
  }

  onClickGroup(event) {
    //show groups
    let groups = document.getElementById("groupDiv").setAttribute("class", "!hide");
    //hide users
    let users = document.getElementById("userDiv").setAttribute("class", "hide");
  }

  onClickUser(event) {
    //show users
    let users = document.getElementById("userDiv").setAttribute("class", "!hide");
    //hide groups and group-list
    let groups = document.getElementById("groupDiv").setAttribute("class", "hide");
    let groupList = document.getElementById("groupListDiv").setAttribute("class", "hide");
  }

}
