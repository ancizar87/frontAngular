import { Injectable } from '@angular/core';
import { HttpClient, HttpBackend } from '@angular/common/http';

@Injectable()
export class HttpBackendClientService extends HttpClient {

  constructor(handler: HttpBackend) {
    super(handler);
  }
}
