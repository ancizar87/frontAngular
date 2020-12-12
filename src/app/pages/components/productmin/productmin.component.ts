import { Component, OnInit, Input } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ProductService } from '../../../services/product.service';
import { environment } from '../../../authService/environment.prod';
import { StorageServiceService } from '../../../services/storage-service.service';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-productmin',
  templateUrl: './productmin.component.html',
  styleUrls: ['./productmin.component.scss']
})
export class ProductminComponent implements OnInit {

  //public urlPublic = environment.apiUrl;

  //public allProducts: any;

  public productsAdd = [];

  @Input() data;
  @Input() urlPublic;

  products = false;
  promoProduct = false;

  constructor(private _snackBar: MatSnackBar, private globalSrv: StorageServiceService, private router: Router ) { }

  ngOnInit() {
    //console.log(this.data);

    if (this.router.url == '/promocion') {
      this.promoProduct = true;
    } else {
      this.products = true;
    }

    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      if (event.url == '/promocion') {
        this.promoProduct = true;
      } else {
        this.products = true;
      }
    });
  }

  addCard(producto) {

    let oneProduct = Object.assign({ 'id': producto.id, 'producto': producto.opcionCaracteristica[0].descripcion, 'idOpcionBase': producto.opcionCaracteristica[0].id, 'codigo': producto.opcionCaracteristica[0].codigoP, 'unidadMedida': producto.opcionCaracteristica[0].UMedida, 'unidades':producto.opcionCaracteristica[0].minimo, 'unidadMinima': producto.opcionCaracteristica[0].minimo, 'unidMax':producto.opcionCaracteristica[0].cantidad, 'precio': producto.opcionCaracteristica[0].precio })

    if (localStorage.getItem('productos') != (undefined || null)) {
      let storage = JSON.parse(localStorage.getItem('productos'));
      this.productsAdd = Object.assign(storage);

      //console.log(oneProduct)
      this.productsAdd.push(oneProduct);
      let productoActual = this.productsAdd.filter(item => item.id == producto.id);
      //console.log(productoActual.length > 1)
      if (productoActual.length > 1) {
        this._snackBar.open('Este producto ya existe en el carrito', 'ok', {
          duration: 3000,
        });
      } else {
        localStorage.setItem('productos', JSON.stringify(this.productsAdd));
        //let itemStorage = JSON.parse(localStorage.getItem('productos'));
        let itemStorage = this.globalSrv.theItem = JSON.stringify(this.productsAdd);
      }
    } else {
      //console.log('se crea por primera vez', oneProduct)
      this.productsAdd.push(oneProduct)
      localStorage.setItem('productos', JSON.stringify(this.productsAdd));
      //let itemStorage = JSON.parse(localStorage.getItem('productos'));
      let itemStorage = this.globalSrv.theItem = JSON.stringify(this.productsAdd);
    }

  }

}
