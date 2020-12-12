import { environment } from './environment.prod';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { User } from './../models/user';

@Injectable({ providedIn: 'root' })
export class UserService {
    constructor(private http: HttpClient) { }

    getCurrentUser() {
      return this.http.get<User[]>(`${environment.apiUrl}/auth/user/`);
    }

    updateCurrentUser(userCurrentData) {
      return this.http.put<User[]>(`${environment.apiUrl}/auth/user/`, userCurrentData);
    }

    getAll(idUser) {
        return this.http.get<User[]>(`${environment.apiUrl}/dastosUsuario/${idUser}`);
    }

    userCreateData(userData) {
      return this.http.post(`${environment.apiUrl}/dastosUsuario/post/`, userData);
    }

    userUpdate(emailUser, userData) {
      return this.http.put(`${environment.apiUrl}/dastosUsuario/update/${emailUser}/`, userData);
    }
}
