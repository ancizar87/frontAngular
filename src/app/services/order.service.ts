import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpInterceptor } from '@angular/common/http';
import { environment } from '../authService/environment.prod';
import { Order, OrderItem } from '../models/order';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  private currentOrderSubject: BehaviorSubject<any>;
  //public currentOrder: Observable<any>;

  constructor(private http: HttpClient) {
    this.currentOrderSubject = new BehaviorSubject<any>('pub_test_0uEbX2kZD2EuLa5rFjr0LyGX1WGj2aRF');
    //this.currentOrder = this.currentOrderSubject.asObservable();
  }

  public get currentOrderValue(): any {
      return this.currentOrderSubject.value;
  }

  makeOrderShop(orden) {
    return this.http.post<Order>(`${environment.apiUrl}/orders/makeorder/post/`, orden);
  }

  getOrder(user) {
    return this.http.get<Order>(`${environment.apiUrl}/orders/makeorders/${user}/`);
  }

  getOrderItem(orderId) {
    return this.http.get<Order>(`${environment.apiUrl}/orders/orderitems/${orderId}/`);
  }

  saveProductsByOrder(productOrder) {
    return this.http.post<OrderItem>(`${environment.apiUrl}/orders/orderitem/post/`, productOrder);
  }

  updateOrder(idOrder, order) {
    return this.http.put(`${environment.apiUrl}/orders/updateorder/${idOrder}/`, order);
  }

  statusOrder(idOrder) {
    return this.http.get(`https://sandbox.wompi.co/v1/transactions/${idOrder}`);
  }
}
