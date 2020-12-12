import { environment } from './../../../authService/environment.prod';
import { ProductService } from './../../../services/product.service';
import { Component, OnInit, ViewChild, ChangeDetectorRef, Input, ElementRef, HostListener } from '@angular/core';
import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { MatSnackBar } from '@angular/material/snack-bar';
import { catchError } from 'rxjs/operators';
import { Producto } from '../../../models/producto';


@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.scss']
})
export class ProductoComponent implements OnInit {

  @ViewChild('menuFloat', {static: false}) menuFloat: ElementRef;

  public urlPublicEnv = environment.apiUrl;

  public allProducts: any;

  public expand = true;
  public hideExp: boolean = true;

  loadProducts = false;
  noEmptyPost = true;
  notscrolly = true;

  ramas:any;

  showLoad = false;
  showLoadCat = false;

  stickyLeftMenu = false;

  showBackFilter = true;
  allProductsLength: any;

  @ViewChild('matExpansionPanel', { static: false }) mep: ElementRef;
  @ViewChild('contentCatalogo', {static: false}) contentCatalogo: ElementRef;

  constructor(public breakpointObserver: BreakpointObserver, public products: ProductService, private _snackBar: MatSnackBar) { }

  ngOnInit() {
    this.breakpointObserver
      .observe(['(max-width: 1279px)'])
      .subscribe((state: BreakpointState) => {
        if (state.matches) {
          this.expand = false;
          this.hideExp = false;
        } else {
          this.hideExp = true;
          this.expand = true;
        }
      });
      this.getAllProducts();
      this.getAllRamas();

      this.products.getAllProductsShow().subscribe(data => {
        this.allProductsLength = data;
      });
  }

  getAllRamas() {
    this.showLoadCat = true;
    this.products.getProductRamal().subscribe(ramas => {
      let ramaje = [];
      let ObRama = {};
      let newRama = [];

      ramaje.push(ramas);
      ramaje[0].forEach(elem => {
        if(elem.nombre != null) {
          ObRama = Object.assign({'id': elem.id, 'nombre': elem.nombre});
          newRama.push(ObRama);
          this.showLoadCat = false;
          return newRama;
        }
      })
      this.ramas = newRama;
    })
  }

  getAllProducts() {
    this.showLoad = true;
    this.showBackFilter = false;
    let initPage = 1;
    this.products.getAllProducts(initPage).subscribe(data => {
      this.allProducts = data['results'];
      this.showLoad = false;
    })
  }

  filterListProd(value) {
    this.showLoad = true;
    this.products.filterProductsBycateg(value).subscribe(data => {
      this.allProducts = data;
      this.showLoad = false;
      this.showBackFilter = true;
    })
  }

  onScroll() {
    if (this.notscrolly && this.noEmptyPost) {
      this.loadProducts = true;
      this.notscrolly = false;
      this.loadNextPost();
    }
  }

  autoIncrement = 1;

  loadNextPost() {
    if (this.allProductsLength != undefined) {
      ++this.autoIncrement
      if (this.autoIncrement <= this.allProductsLength.length) {
        this.autoIncrement;
      }

    //let newArr = [];
    //newArr.push(this.allProducts)
      const lastPost = this.allProductsLength[this.allProductsLength.length - 1];

      const lastPostId = lastPost.id;
      const dataToSend = new FormData();
      dataToSend.append('id', lastPostId);

      this.products.getAllProducts(this.autoIncrement).subscribe(data => {
        const newProducts = data['results'];
        this.loadProducts = false;
        if (newProducts.length === 0) {
          this.noEmptyPost = false;
        }
        this.allProducts = this.allProducts.concat(newProducts);
        this.notscrolly = true;
      }, err => {
        this.loadProducts = false;
        this._snackBar.open('No hemos encontrado más productos', 'ok', {
          duration: 4000,
        });
      })
    }
  }

}
