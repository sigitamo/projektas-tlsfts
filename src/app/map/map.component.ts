import { Component, OnInit } from '@angular/core';
// import { AgmMap } from '@agm/core';
import { HttpClient } from '@angular/common/http';
import { ConfigService } from '../config.service';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { MarkerService } from './services/marker.service';

let google: any;

interface marker{
  name: string;
  lat: number;
  lng: number;
}

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css'],
  providers: [MarkerService]
})

export class MapComponent implements OnInit {
  url: string;
  markers:Array<marker>;
  index: number;
  lat: number = 54.698126;
  lng: number = 25.3190053;

  constructor(private fromConfig: ConfigService,
      private markerService: MarkerService,
      private httpClient: HttpClient) { }

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
  markerClicked(marker: marker, index: number){
    console.log('Marker was clicked: ' + marker.name);
  }

}
