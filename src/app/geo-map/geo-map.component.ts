import { Component } from '@angular/core';

import { MarkerService } from './services/marker.service';

interface marker{
  name: string;
  lat: number;
  lng: number;
}

@Component({
  selector: 'app-geo-map',
  templateUrl: './geo-map.component.html',
  styleUrls: ['./geo-map.component.css'],
  providers: [MarkerService]
})

export class GeoMapComponent {
  zoom: number = 10;
  lat: number = 54.698126;
  lng: number = 25.3190053;

  markerName: string;
  markerLat: string;
  markerLng: string;
  
  markers: marker[];
    
  constructor(private markerService: MarkerService) {
    this.markers = this.markerService.getMarkers();
  }

  // info Marker in console, wich marker was clicked
  markerClicked(marker: marker, index: number){
    console.log('Marker was clicked: ' + marker.name);
  }
     
}

