import { Component, OnInit } from '@angular/core';
import { TerminosService } from 'src/app/services/terminos.service';

@Component({
  selector: 'app-modaltermino',
  templateUrl: './modaltermino.component.html',
  styleUrls: ['./modaltermino.component.scss']
})
export class ModalterminoComponent implements OnInit {
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
