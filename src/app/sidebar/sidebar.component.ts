import { Component, Input, OnInit } from '@angular/core';

import { marker} from '../map/map.component'
import { MarkerService } from '../map/services/marker.service';

@Component({
    selector: 'app-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.css']
})

export class SidebarComponent implements OnInit {
    @Input() marker: marker[];
    @Input() index: number;
    @Input() latitude: number;
    @Input() longitude: number;
    @Input() openOnMarkerClick: boolean = true;
    
    // markers:Array<marker>;
    // name: string;
    // lat: number = 54.698126;
    // lng: number = 25.3190053;


    constructor(private markerService: MarkerService) { }
        

    ngOnInit() {
        // this.markerService.fetch(name, this.lat, this.lng)
        //     .subscribe(data => {
        //         this.markers = data;
        //     })
    }

    markerClick(marker: marker, index: number) {
        // let a = document.querySelector("a");
        // a.setAttribute("longitude", "latitude");
        let a  = document.querySelector("agm-info-window");
        console.log('Markeris iš sąrašo '+ marker.name + ' ir ' + marker.lat);
        // this.markerService.fetch(name, this.lat, this.lng);
         
        
       
      }

}

