import { AuthenticationService } from './authService/authentication.service';
import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { take, map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
    constructor(
        private router: Router,
        private authenticationService: AuthenticationService
    ) { }

    canActivate(
      next: ActivatedRouteSnapshot,
      state: RouterStateSnapshot
    ): Observable<boolean> {
      return this.authenticationService.isLoggedIn         // {1}
        .pipe(
          take(1),                              // {2}
          map((isLoggedIn: boolean) => {         // {3}
            if (!isLoggedIn) {
              this.router.navigate(['/login']);  // {4}
              return false;
            }
            return true;
          })
        )
    }

    /*canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const currentUser = this.authenticationService.currentUserValue;
        if (currentUser) {
            console.log(currentUser);
            // logged in so return true
            return true;
        }
        console.log(currentUser);
        // not logged in so redirect to login page with the return url
        this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
        return false;
    }*/
}
