import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

import { User } from './user';


@Injectable()

export class UserService {
    usersChanged = new Subject<User[]>();
    
    private users: User[];

    deleteUser(username: string) {
        this.users.splice(0, 1);
        this.usersChanged.next(this.users.slice());
    }
}