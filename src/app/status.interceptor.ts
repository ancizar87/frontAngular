import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent
} from "@angular/common/http";
import { Observable, BehaviorSubject } from "rxjs";
import { OrderService } from './services/order.service';
import { Router, ActivatedRoute } from '@angular/router';

export class statusInterceptor implements HttpInterceptor {

    constructor(private orderService: OrderService, private _router: Router, private route: ActivatedRoute) {}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
      let idOrder = this.route.queryParams;
      const edgeUrl = `https://sandbox.wompi.co/v1/transactions/${idOrder}`
      const url = `${edgeUrl}${req.url}`;
      return next.handle(req.clone({ url }));
    }
}
