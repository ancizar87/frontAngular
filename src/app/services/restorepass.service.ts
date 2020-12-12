import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../authService/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class RestorepassService {

  constructor(private http: HttpClient) { }

  restorepass(data) {
    return this.http.post(`${environment.apiUrl}/recuperarpass/`,data);
  }

  newPass(data) {
    return this.http.post(`${environment.apiUrl}/recuperarpass/confirm/`,data);
  }

}
