import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../authService/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class TerminosService {

  constructor(private http:HttpClient) { }

  getTerminos() {
    return this.http.get(`${environment.apiUrl}/terminosCondiciones/terminos/`);
  }
}
