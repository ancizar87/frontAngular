import { Component, OnInit, ViewChild, ChangeDetectorRef, Input } from '@angular/core';
import { NguCarousel, NguCarouselConfig } from '@ngu/carousel';
import { Observable, interval } from 'rxjs';
import { ProductService } from '../../../../services/product.service';

@Component({
  selector: 'app-productomes',
  templateUrl: './productomes.component.html',
  styleUrls: ['./productomes.component.scss']
})
export class ProductomesComponent implements OnInit {

  allProducts = [];

  public carouselProduct: NguCarouselConfig;

  constructor(private products: ProductService) {

  }

  ngOnInit() {
    let productos = [];
    this.products.getAllProductsmes().subscribe(data => {
      productos.push(data);
      this.allProducts = productos[0];
      //console.log(this.allProducts);

    });
    this.carouselProduct = {
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



}
