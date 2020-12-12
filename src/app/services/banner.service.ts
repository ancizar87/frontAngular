import { environment } from './../authService/environment.prod';

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BannerService {

  constructor(private http:HttpClient) { }

  getblog() {
    return this.http.get(`${environment.apiUrl}/banner/`);
  }
}
