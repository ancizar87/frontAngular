import { Component, OnInit } from '@angular/core';
import { TerminosService } from 'src/app/services/terminos.service';

@Component({
  selector: 'app-terminos',
  templateUrl: './terminos.component.html',
  styleUrls: ['./terminos.component.scss']
})
export class TerminosComponent implements OnInit {
  allterminos = {}
  content = {}

  constructor(public terminos:TerminosService) { }

  ngOnInit() {
     this.getAllterminos()
  }

  getAllterminos(){
    this.terminos.getTerminos().subscribe(termdata => {
      this.allterminos = termdata
    })
  }

}
