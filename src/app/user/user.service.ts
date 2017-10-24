import { Injectable, OnInit } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { User } from './user';
import { ConfigService } from '../config.service';


@Injectable()

export class UserService implements OnInit {
    url = '';
    groups: any;
    usersChanged = new Subject<User[]>();
    
    private users: User[];

constructor( 
        private httpClient: HttpClient,
        private fromConfig: ConfigService) {}

ngOnInit() {
    this.url = this.fromConfig.urlServer.valueOf();
}

    deleteUser(username: string) {
        this.users.splice(0, 1);
        this.usersChanged.next(this.users.slice());
    }


    // getGroup(index: number): Observable<any>{
    //     var groupName = this.groups[index].name.valueOf();
    //     // var groupUsernames = this.groups[index].usernames;
    //     return this.httpClient.get('http://' + this.url + '/group', {
    //       params: new HttpParams().set('name', groupName)
    //     })
    //     // .map((result: Response) => result.json());
        
    // }

}