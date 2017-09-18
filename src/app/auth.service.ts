import { Injectable } from '@angular/core';


@Injectable()
export class AuthService {
    sessionData = null;

    isAuthenticated() : boolean {
        if(this.sessionData != null){
            return true;
        } else {
            return false;
        }
    }

    logout() {
        this.sessionData = null;
    }

}