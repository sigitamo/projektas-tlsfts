import { Component, OnInit } from '@angular/core';
// import { AgmMap } from '@agm/core';

let google: any;

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})

export class MapComponent implements OnInit {
  lat: number = 54.698126;
  lng: number = 25.3190053;

  // - apsidaryti get kas kelias sekundes ir atvaizduoti zem4lapyje

  constructor() { }

  ngOnInit() {
  }

}
