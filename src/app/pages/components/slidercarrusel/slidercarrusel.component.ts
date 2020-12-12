import { Component, OnInit, ViewChild, ChangeDetectorRef, Input } from '@angular/core';
import { NguCarousel, NguCarouselConfig } from '@ngu/carousel';
import { Observable, interval } from 'rxjs';
import { bannerHome } from '../../../models/banner';
import { BannerService } from '../../../services/banner.service';
import { environment } from '../../../authService/environment.prod';

@Component({
  selector: 'app-slidercarrusel',
  templateUrl: './slidercarrusel.component.html',
  styleUrls: ['./slidercarrusel.component.scss']
})
export class SlidercarruselComponent implements OnInit {

  bannerHom: bannerHome;

  urlPub = environment.apiUrl;
  valueOrder: number;

  imgags = [
    {
      title: 'CAMARA TURBO 720P',
      subtitle: 'EXT MINI BALA D/N F2.8 IR20mm IP66 PLASTICA HILOOK',
      pathBgImg: './assets/banner/fondo1.jpg',
      imgS: './assets/images/camara.png'
    },
    {
      title: 'CAMARA TURBO 720P',
      subtitle: 'EXT MINI BALA D/N F2.8 IR20mm IP66 PLASTICA HILOOK',
      pathBgImg: './assets/banner/fondo1.jpg',
      imgS: './assets/images/camara.png'
    },
    {
      title: 'CAMARA TURBO 720P',
      subtitle: 'EXT MINI BALA D/N F2.8 IR20mm IP66 PLASTICA HILOOK',
      pathBgImg: './assets/banner/fondo1.jpg',
      imgS: './assets/images/camara.png'
    }
  ];
  /*public carouselTileItems: Array<any> = [0,1,2,3];
  public carouselTiles = {
    0: [],
    1: [],
    2: [],
    3: []
  };*/
  public carouselTile: NguCarouselConfig = {
    grid: { xs: 1, sm: 1, md: 1, lg: 1, all: 0},
    slide: 1,
    speed: 800,
    point: {
      visible: true
    },
    load: 1,
    velocity: 3000,
    touch: true,
    //easing: 'cubic-bezier(0, 0, 0.2, 1)',
    loop: true,
    interval: { timing: 6000 },
    animation: 'lazy'
  };

  constructor(private bannerService: BannerService) {}

  ngOnInit() {
   this.bannerService.getblog().subscribe((item: bannerHome) => {
     this.bannerHom = item;
   })
  }
}
