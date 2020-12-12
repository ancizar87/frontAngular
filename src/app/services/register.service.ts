import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from './../authService/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor(private http:HttpClient) { }

  register(data) {
    return this.http.post(`${environment.apiUrl}/auth/registration/`,data);
  }
}
