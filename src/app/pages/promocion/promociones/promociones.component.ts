import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { Producto } from 'src/app/models/producto';
import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-promociones',
  templateUrl: './promociones.component.html',
  styleUrls: ['./promociones.component.scss']
})
export class PromocionesComponent implements OnInit {
  public allProductsPromo: Producto;

  public allData: Producto;

  public expand = true;
  public hideExp: boolean = true;

  ramas:any;

  showLoad = false;
  showLoadCat = false;
  showBackFilter = true;

  @ViewChild('matExpansionPanel', { static: false }) mep: ElementRef;

  constructor(public breakpointObserver: BreakpointObserver, public products: ProductService) { }

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
      this.getAllProductsPromo();
      this.getAllRamas();
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
          ObRama = Object.assign({'nombre': elem.nombre});
          newRama.push(ObRama);
          this.showLoadCat = false;
          return newRama;
        }
      })
      this.ramas = newRama;
    })
  }

  getAllProductsPromo() {
    this.showLoad = true;
    this.showBackFilter = false;
    this.products.filterProductsBycateg(1).subscribe(data => {
      this.allProductsPromo = data;
      this.showLoad = false;
    });
  }

  filterListProd(value) {
    this.showLoad = true;
    this.products.filterProductsBycateg(value).subscribe(data => {
      this.allProductsPromo = data;
      this.showLoad = false;
      this.showBackFilter = true;
    })
  }

}
