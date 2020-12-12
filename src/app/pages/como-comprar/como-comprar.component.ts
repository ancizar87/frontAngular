import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';

@Component({
  selector: 'app-como-comprar',
  templateUrl: './como-comprar.component.html',
  styleUrls: ['./como-comprar.component.scss']
})
export class ComoComprarComponent implements OnInit {
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
