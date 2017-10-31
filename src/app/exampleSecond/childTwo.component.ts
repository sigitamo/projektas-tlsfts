import { Component, Input } from '@angular/core';


@Component({
    selector: 'app-child-two',
    templateUrl: 'childTwo.component.html'
})

export class ChildTwoTwoComponent {

@Input() users: any;
@Input() groups: any;

}