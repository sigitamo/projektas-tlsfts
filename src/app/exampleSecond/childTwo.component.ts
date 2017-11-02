import { Component, Input } from '@angular/core';


@Component({
    selector: 'app-child-two',
    templateUrl: 'childTwo.component.html',
    styleUrls: ['childTwo.component.css']
})

export class ChildTwoTwoComponent {

    selectedGroupName: string;

@Input() users: any;
@Input() groups: any;


onSelectGroup(group: string) {
    
    this.selectedGroupName = group;
    console.log(group + ' was selected');
    return this.selectedGroupName;
  }


}