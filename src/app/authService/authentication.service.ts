import { User } from './../models/user';
import { environment } from './environment.prod';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
    private currentUserSubject: BehaviorSubject<User>;
    public currentUser: Observable<User>;

    private loggedIn = new BehaviorSubject<boolean>(this.tokenAvailable()); // {1}

    private tokenAvailable(): boolean {
      return !!localStorage.getItem('currentUser');
    }

    get isLoggedIn() {
      return this.loggedIn.asObservable(); // {2}
    }

    constructor(private http: HttpClient) {
        this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
        this.currentUser = this.currentUserSubject.asObservable();
    }

    public get currentUserValue(): User {
        return this.currentUserSubject.value;
    }

    login(email: string, password: string) {
        return this.http.post<any>(`${environment.apiUrl}/auth/login/`, { email, password })
            .pipe(map(user => {
                // store user details and basic auth credentials in local storage to keep user logged in between page refreshes
                //user.authdata = window.btoa(email + ':' + password);
                localStorage.setItem('currentUser', JSON.stringify(user));
                this.currentUserSubject.next(user);
                this.loggedIn.next(true);
                return user;
            }));
    }

    logout() {
        // remove user from local storage to log user out
        if(localStorage.getItem('currentUser')){
          var token = JSON.parse(localStorage.getItem('currentUser'))
          var header = {
            headers: new HttpHeaders()
              .set('Authorization',  `Token ${token.key}`)
          };
          return this.http.post(`${environment.apiUrl}/auth/logout/`, {header})
          .pipe(map(userLogout => {
            localStorage.removeItem('currentUser');
            localStorage.removeItem('email');
            this.currentUserSubject.next(null);
            this.loggedIn.next(false);
            return userLogout;
          }));
        }

    }
}
