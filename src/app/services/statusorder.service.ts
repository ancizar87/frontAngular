import { environment } from './../../environments/environment.prod';
import { Injectable } from '@angular/core';
import { HttpClient, HttpBackend, HttpHeaders } from '@angular/common/http';
import { HttpBackendClientService } from './http-backend-client.service';

@Injectable({
  providedIn: 'root'
})
export class StatusorderService {

  constructor(private http: HttpBackendClientService) {}

  /*getstatusorder(idparametro) {
    return this.http.get(`https://mitienda.com.co/pagos/respuesta?id=`, idparametro);
  }*/

   statusOrder(idOrder) {
    const httpOptions = {
      headers: new HttpHeaders({
        "Authorization": "pub_test_0uEbX2kZD2EuLa5rFjr0LyGX1WGj2aRF"
      })
    };
    return this.http.get(`https://sandbox.wompi.co/v1/transactions/${idOrder}`, httpOptions);
  }
}
