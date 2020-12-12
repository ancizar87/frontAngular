import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-panel',
  templateUrl: './user-panel.component.html',
  styleUrls: ['./user-panel.component.scss']
})
export class UserPanelComponent implements OnInit {

  public expand = true;
  public hideExp: boolean = true;

  constructor(
    public breakpointObserver: BreakpointObserver,

    private router: Router
    ) { }

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

  gotoPage(url) {
    if(url == 'mi-cuenta') {
      this.router.navigate(['user-panel']);
    } else {
      this.router.navigate(['user-panel/menu', url]);
    }
  }

}
