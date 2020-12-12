import { Component, OnInit, ViewChild, ChangeDetectorRef, Input } from '@angular/core';
import { NguCarousel, NguCarouselConfig } from '@ngu/carousel';
import { Observable, interval } from 'rxjs';
import { ProductService } from '../../../../services/product.service';
import { StorageServiceService } from '../../../../services/storage-service.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { environment } from '../../../../authService/environment.prod';

@Component({
  selector: 'app-losmasvendidos',
  templateUrl: './losmasvendidos.component.html',
  styleUrls: ['./losmasvendidos.component.scss']
})

export class LosmasvendidosComponent implements OnInit {

  public urlPublic = environment.apiUrl;

  //public allProducts: any;

  public productsAdd = [];
  allProductsPromo = [];

  public carouselProductPromo: NguCarouselConfig;

  constructor(private _snackBar: MatSnackBar, private globalSrv: StorageServiceService, private products: ProductService) {

  }

  ngOnInit() {
    let productosPromo = [];
    this.products.filterProductsBycateg(1).subscribe(data => {
      productosPromo.push(data);
      this.allProductsPromo = productosPromo[0];
      //console.log(this.allProductsPromo);

    });
    this.carouselProductPromo = {
      grid: { xs: 1, sm: 3, md: 4, lg: 4, all: 0},
      slide: 1,
      speed: 800,
      point: {
        visible: true
      },
      load: 1,
      velocity: 0,
      touch: true,
      //easing: 'cubic-bezier(0, 0, 0.2, 1)',
      loop: true,
      interval: { timing: 5000 },
      animation: 'lazy'
    };
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
