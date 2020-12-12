import { environment } from './../authService/environment.prod';
import { User } from './../models/user';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { opcionCaracteristica } from '../models/producto';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) { }

  getAllProducts(pageNumber) {
    return this.http.get(`${environment.apiUrl}/productos/paginas/?page=${pageNumber}`);
  }

  getAllProductsShow() {
    return this.http.get(`${environment.apiUrl}/productos/`);
  }
  getAllProductsmes() {
    return this.http.get(`${environment.apiUrl}/productos/last/`);
  }

  getAllProductsPromos() {
    return this.http.get(`${environment.apiUrl}/productos/promo/True/`);
  }

  getProductDetail(filter) {
    return this.http.get(`${environment.apiUrl}/productos/`);
  }

  getProductRamal() {
    return this.http.get(`${environment.apiUrl}/ramas/`);
  }

  getProductByCodeP(codigoP) {
    return this.http.get(`${environment.apiUrl}/caractproducto/`, codigoP)
  }

  getAllProductoCaract() {
    return this.http.get(`${environment.apiUrl}/caractproducto/caract/`)
  }

  getAllProductoFilter(ids) {
    return this.http.get(`${environment.apiUrl}/caractproducto/filtro/${ids}/`)
  }

  filterProductByCaract(keyPhrase: string): Observable<opcionCaracteristica>  {

    return this.http
      .get<opcionCaracteristica>(`${environment.apiUrl}/caractproducto/buscar/?`, {
        observe: 'response',
        params: {
          search: keyPhrase,
        }
      })
      .pipe(
        map(res => {
          return res.body;
        })
      );
    //return this.http.get(`${environment.apiUrl}/caractproducto/buscar/?search=`, keyPhrase)
  }

  filterProductsBycateg(idCategoria) {
    return this.http.get(`${environment.apiUrl}/productos/fcategoria/?search=${idCategoria}`)
  }

}
