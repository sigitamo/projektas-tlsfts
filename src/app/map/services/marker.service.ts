import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

// import { Init } from '../init-markers';
import {ConfigService} from '../../config.service';

export interface Marker {
        name: string;
        lat: number;
        lng: number;
      }
@Injectable()

export class MarkerService {
baseUrl = ''; 
url = ''; 
marker = {
  name: 'test',
  lat: '',
  lng: ''
}
    constructor(
            private http: HttpClient, 
            private fromConfig: ConfigService) { }

   fetch(name: string, lat: number, lng: number): Observable<Marker[]> {
       let params = new HttpParams();
       params = params
        .set('name', name.toString())
        .set('lat', lat.toString())
        .set('lng', lng.toString());
       
       this.url = this.fromConfig.urlServer.valueOf();
       this.baseUrl = 'http://' + this.url + '/map';
     
       return this.http.get(this.baseUrl, {
          params})
            .map(res => res as Marker[] || []);
   } 

  //  getMarker(id: number) {
  //    return this.marker.
  //  }
   

}
