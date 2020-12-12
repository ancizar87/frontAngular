import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../authService/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class BlogService {

  constructor(private http:HttpClient) { }

  getblog() {
    return this.http.get(`${environment.apiUrl}/blog/bloger/`);
  }

  getDetailblog(titleBlog?) {
    return this.http.get(`${environment.apiUrl}/blog/filter/${titleBlog}/`);
  }

  filterBlogByCat(categoryBlog) {
    return this.http.get(`${environment.apiUrl}/blog/categorias/${categoryBlog}/`);
  }

  getCategorys() {
    return this.http.get(`${environment.apiUrl}/categoriasblog/categorias/`);
  }
}
