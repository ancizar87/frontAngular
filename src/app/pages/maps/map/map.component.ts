import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {
  texto : string = 'Conecta con ingeniería';
  lat: number = 4.716123;
  lng: number = -74.053403;
  zoom: number = 15;

  constructor(private router:Router) { }

  ngOnInit() {
  }

  clickedMarker(){
   window.open('https://www.google.com.co/maps/place/Conecta+con+Ingenier%C3%ADa/@4.7161022,-74.0539602,19z/data=!4m12!1m6!3m5!1s0x8e3f8548075d1be9:0xd20a885a69cdf4e6!2sConecta+con+Ingenier%C3%ADa!8m2!3d4.7161022!4d-74.053413!3m4!1s0x8e3f8548075d1be9:0xd20a885a69cdf4e6!8m2!3d4.7161022!4d-74.053413?hl=es&authuser=0','_blank'
  )}

}
