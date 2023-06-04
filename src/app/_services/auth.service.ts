import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Router } from '@angular/router';
const USER_KEY = 'auth-user';

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    private authSubject = new BehaviorSubject<boolean>(false);
    private isLoggedIn$ = this.authSubject.asObservable();
    token!: any;
    currentUser = {};
    endpoint: string = 'http://localhost:8081/GestionDesAbsences/auth/';
    headers = new HttpHeaders().set(
        'Authorization',
        'Bearer ' + this.getToken()
    );

    constructor(private http: HttpClient, private router: Router) {}

    signin(data: any) {
        return this.http.post(this.endpoint + 'signin', data);
    }

    register(data: any) {
        return this.http.post(this.endpoint + 'signup', data);
    }

    logout() {
        window.localStorage.clear();
        this.updateLoggedInState(false);
        this.router.navigateByUrl('/login');
    }

    private getToken(): string {
        if (!this.token) {
            this.token = localStorage.getItem('token');
        }
        return this.token;
    }

    public updateLoggedInState(status: boolean) {
        this.authSubject.next(status);
    }

    public isAuthenticated(): Observable<boolean> {
        if (this.getToken()) {
            this.updateLoggedInState(true);
        }
        return this.isLoggedIn$;
    }
}
