import { Component, Input , OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Location } from '@angular/common';
import 'rxjs/add/operator/switchMap';

import { Group } from '../group'; 

@Component({
  selector: 'app-group-item',
  templateUrl: './group-item.component.html',
  styleUrls: ['./group-item.component.css']
})
export class GroupItemComponent implements OnInit {
  @Input() group: Group;

  constructor(
        private route: ActivatedRoute,
        private location: Location
  ) { }

  ngOnInit() {
  }

  
}
