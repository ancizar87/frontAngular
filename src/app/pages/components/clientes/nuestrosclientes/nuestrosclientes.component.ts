import { Component, OnInit, ViewChild, ChangeDetectorRef, Input } from '@angular/core';
import { NguCarousel, NguCarouselConfig } from '@ngu/carousel';
import { Observable, interval } from 'rxjs';

@Component({
  selector: 'app-nuestrosclientes',
  templateUrl: './nuestrosclientes.component.html',
  styleUrls: ['./nuestrosclientes.component.scss']
})
export class NuestrosclientesComponent implements OnInit {
  imgags = [
    {
      imgS: './assets/images/salitremagico.jpg',
    },
    {
      imgS: './assets/images/grupolab.png'
    },
    {
      imgS: './assets/images/coorparques.png'
    },
    {
      imgS: './assets/images/diverplaza.jpg'
    },
    {
      imgS: './assets/images/marriott.png'
    },
    {
      imgS: './assets/images/unal.jpg'

    },
    {
      imgS: './assets/images/bbc.jpg'
    },
    {
      imgS: './assets/images/intecmo.jpg'
    },
    {
      imgS: './assets/images/subway.jpg'
    },
    {
      imgS: './assets/images/ZX-VENTURES.png'
    },
    {
      imgS: './assets/images/atelcro.png'
    },
    {
      imgS: './assets/images/cityboloclub.jpg'
    },
    {
      imgS: './assets/images/integral.png'
    }
  ];
  public carouselNuestrosclientes: NguCarouselConfig = {
    grid: { xs: 2, sm:3 , md: 4, lg: 5, all: 0},
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
