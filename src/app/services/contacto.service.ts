import { environment } from './../authService/environment.prod';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ContactoService {

  constructor(private http:HttpClient) { }

  contacto(data) {
    return this.http.post(`${environment.apiUrl}/formcontact/`,data);
  }
}
