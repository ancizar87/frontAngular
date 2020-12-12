import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';

@Component({
  selector: 'app-politicas-datos',
  templateUrl: './politicas-datos.component.html',
  styleUrls: ['./politicas-datos.component.scss']
})
export class PoliticasDatosComponent implements OnInit {
  public expand = true;
  public hideExp: boolean = true;

  constructor(public breakpointObserver: BreakpointObserver) { }

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

      
  }

  scroll(elem: HTMLElement) {
    elem.scrollIntoView({behavior:'smooth'});
}

}
