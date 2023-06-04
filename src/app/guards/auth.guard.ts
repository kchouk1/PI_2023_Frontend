import { Injectable } from '@angular/core';
import {
    ActivatedRouteSnapshot,
    CanActivate,
    Router,
    RouterStateSnapshot,
    UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class AuthGuard implements CanActivate {
    constructor(private router: Router) {}
    canActivate() {
        if (!this.checkToken()) {
            alert('you must login');

            // not allowed, redirect to login
            this.router.navigate(['login']);
            return false;
        } else {
            // allowed
            return true;
        }
    }

    public checkToken() {
        return !!localStorage.getItem('token');
    }
    //   private setSession(authResult:any) {
    //     const expiresAt = moment().add(authResult.expiresIn,'second');

    //     localStorage.setItem('token', authResult.token);
    //     localStorage.setItem("expires_at", JSON.stringify(expiresAt.valueOf()) );
    // }

    logout() {
        localStorage.removeItem('token');
        localStorage.removeItem('expires_at');
    }
}
