import { Component, OnInit } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  constructor(private matIconRegistry: MatIconRegistry, private domSanitizer: DomSanitizer){
    this.matIconRegistry.addSvgIcon(
      "home",
      this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/images/home.svg")
    );
    this.matIconRegistry.addSvgIcon(
      "phone",
      this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/images/phone.svg")
    );
    this.matIconRegistry.addSvgIcon(
      "cel",
      this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/images/cel.svg")
    );
    this.matIconRegistry.addSvgIcon(
      "arroba",
      this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/images/arroba.svg")
    );
    this.matIconRegistry.addSvgIcon(
      "arroba",
      this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/images/arroba.svg")
    );
    this.matIconRegistry.addSvgIcon(
      "facebook",
      this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/images/facebook.svg")
    );
    this.matIconRegistry.addSvgIcon(
      "instagram",
      this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/images/instagram.svg")
    );
    this.matIconRegistry.addSvgIcon(
      "linkedin",
      this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/images/linkedin.svg")
    );
    this.matIconRegistry.addSvgIcon(
      "youtube",
      this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/images/youtube.svg")
    );
  }

  ngOnInit() {
  }

}
