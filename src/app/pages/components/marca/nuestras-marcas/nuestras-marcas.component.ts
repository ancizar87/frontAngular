import { Component, OnInit } from '@angular/core';
import { NguCarouselConfig } from '@ngu/carousel';
import { Observable, interval } from 'rxjs';

@Component({
  selector: 'app-nuestras-marcas',
  templateUrl: './nuestras-marcas.component.html',
  styleUrls: ['./nuestras-marcas.component.scss']
})
export class NuestrasMarcasComponent implements OnInit {
  imgags = [
    {
      imgS: './assets/images/3M.png',
    },
    {
      imgS: './assets/images/acme-leon.png'
    },
    {
      imgS: './assets/images/adler.png'
    },
    {
      imgS: './assets/images/amp.png'
    },
    {
      imgS: './assets/images/auta.png'
    },
    {
      imgS: './assets/images/biticino.png'
    },
    {
      imgS: './assets/images/centelsa.png'
    },
    {
      imgS: './assets/images/codelca.png'
    },
    {
      imgS: './assets/images/colmena.png'
    },
    {
      imgS: './assets/images/dexson.png'
    },
    {
      imgS: './assets/images/EBCHQ.png'
    },
    {
      imgS: './assets/images/ezviz.png'
    },
    {
      imgS: './assets/images/fermax.png'
    },
    {
      imgS: './assets/images/hilook.png'
    },
    {
      imgS: './assets/images/hycomm.png'
    },
    {
      imgS: './assets/images/intec.png'
    },
    {
      imgS: './assets/images/irwin.png'
    },
    {
      imgS: './assets/images/legrand.png'
    },
    {
      imgS: './assets/images/leviton.png'
    },
    {
      imgS: './assets/images/loctite.png'
    },
    {
      imgS: './assets/images/luminex.png'
    },
    {
      imgS: './assets/images/nicomar.png'
    },
    {
      imgS: './assets/images/panduit.png'
    },
    {
      imgS: './assets/images/paradox.png'
    },
    {
      imgS: './assets/images/pavco.png'
    },
    {
      imgS: './assets/images/powest.png'
    },
    {
      imgS: './assets/images/procables.png'
    },
    {
      imgS: './assets/images/proskit.png'
    },
    {
      imgS: './assets/images/rawelt.png'
    },
    {
      imgS: './assets/images/rejiband.png'
    },
    {
      imgS: './assets/images/tenda.png'
    },
    {
      imgS: './assets/images/tercol.png'
    },
    {
      imgS: './assets/images/tplink.png'
    },
    {
      imgS: './assets/images/zkteco.png'
    }
  ];
  public carouselNuestrasMarcas: NguCarouselConfig = {
    grid: { xs: 4, sm:6 , md: 8, lg: 10, all: 0},
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
    interval: { timing: 3000 },
    animation: 'lazy'
  };

  constructor() { }

  ngOnInit() {
  }

}
