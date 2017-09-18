import { Injectable } from '@angular/core';
import {Router } from '@angular/router';

@Injectable()
export class AuthService {
    sessionData = null;

constructor(private router: Router) {}

    isAuthenticated() : boolean {
        if(this.sessionData != null){
            return true;
        } else {
            return false;
        }
    }

    logout() {
        this.sessionData = null;
        this.router.navigate(['/']);
    }

}