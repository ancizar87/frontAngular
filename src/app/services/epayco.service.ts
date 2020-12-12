import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { EpaycoTransaction } from '../models/order';

@Injectable({
  providedIn: 'root'
})
export class EpaycoService {

  configUrl = 'https://secure.epayco.co/validation/v1/reference/';
  constructor(
  private http: HttpClient,
  ) { }

  ngOnInit() {

  }

  getTransactionResponse(refPayco: string) {
    return this.http.get<EpaycoTransaction>(this.configUrl+refPayco);
  }
}
