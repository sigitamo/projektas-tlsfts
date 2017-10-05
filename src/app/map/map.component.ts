import { Component, OnInit } from '@angular/core';
import { AgmMap } from '@agm/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { ConfigService } from '../config.service';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/map';
import { MarkerService } from './services/marker.service';

let google: any;
let map: any;

export interface marker{
  name?: string;
  lat: number;
  lng: number;
}
interface user{
  username?: string
}

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css'],
  providers: [MarkerService]
})

export class MapComponent implements OnInit {
  url: string;
  //gooogle maps zoom level
  zoom: number = 10;
  //initial center position for map
  lat: number = 54.698126;
  lng: number = 25.3190053;

  markers:Array<marker>;
  users:Array<user>;
  index: number;
  
  
  constructor(private fromConfig: ConfigService,
      private markerService: MarkerService,
      private httpClient: HttpClient
      ) { }

  ngOnInit():void {
    this.url = this.fromConfig.urlServer.valueOf();
    // this.httpClient.get('http://' + this.url + '/map').subscribe(data=>{let results: any = data['results']});
    // return console.log(this.lat);
    
  this.markerService.fetch(name, this.lat, this.lng)
    .subscribe(data => {
      this.markers = data;
      
    })

  }

  // info Marker in console, wich marker was clicked
  clickedMarker(name: string, index: number){
    console.log('Marker was clicked: ${label || index}');
  }

  markerClick(marker: marker, index: number) {
    // let a = document.querySelector("a");
    // a.setAttribute("longitude", "latitude");
    console.log('Markeris iš sąrašo '+ marker.name + ' ir ' + marker.lat);
   
  }

}
