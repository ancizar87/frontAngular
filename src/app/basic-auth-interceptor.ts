import { Injectable, Inject, InjectionToken } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';

import { AuthenticationService } from './authService/authentication.service';
import { Router, ActivatedRoute, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { OrderService } from './services/order.service';
import { resolve } from 'url';
import { retry, catchError, finalize } from 'rxjs/operators';
import { environment } from './authService/environment.prod';

export const BASIC_AUTH_EXCLUDES = new InjectionToken<Array<string | RegExp>>('cmckni3.basic-auth-excludes');

@Injectable()
export class BasicAuthInterceptor implements HttpInterceptor {
    urlResponse: any;
    constructor(private authenticationService: AuthenticationService,
                private router: ActivatedRoute,
                private _router: Router,
                private orderService: OrderService,
                private http: HttpClient,
                @Inject(BASIC_AUTH_EXCLUDES) private exclusions: Array<string | RegExp>) {}



    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // add authorization header with basic auth credentials if available
        const currentUser = this.authenticationService.currentUserValue;
        /*let ruta = '';
        let newRoute = this._router.events
        .subscribe((e: any) => {
          return ruta = e.url;
        });
        let id = this.router.snapshot['_routerState'].url;
        let newId = (id).slice(1, 13); */
        const currentOrder = this.orderService.currentOrderValue;

        const skipInterceptor = this.exclusions.some(url => {
          //console.log((request.url).slice(0, 41), url)
          if (typeof url === 'string') {
            return (request.url).slice(0, 41) == url;
          }
          return url.test(request.url);
        });
        //console.log((request.url).slice(0, 41) == 'https://sandbox.wompi.co/v1/transactions/');
        if ((request.url).slice(0, 41) == 'https://sandbox.wompi.co/v1/transactions/') {
          //console.log('Si se cumplio el skip', skipInterceptor);
          request = request.clone({
            setHeaders: {
                Authorization: `Bearer ${currentOrder}`
            }
          });
          return next.handle(request);
        } else if(request.url !== `${environment.apiUrl}/auth/login/` || request.url !== `${environment.apiUrl}/auth/logout/`) {
          //console.log('NO se cumplio el skip');
          if(currentUser) {
            request = request.clone({
              setHeaders: {
                  Authorization: `Token ${currentUser['key']}`
              }
            });
          }
        }

        return next.handle(request)
    }
}
