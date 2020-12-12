import { Component, ViewChild, ElementRef, AfterViewInit, HostListener, OnChanges } from '@angular/core';
import { MatIconRegistry } from "@angular/material/icon";
import { DomSanitizer } from '@angular/platform-browser';
import { AuthenticationService } from './authService/authentication.service';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { StorageServiceService } from './services/storage-service.service';
import { startWith, map, debounceTime, tap, switchMap, finalize, catchError } from 'rxjs/operators';
import { FormControl, FormBuilder, FormGroup } from '@angular/forms';
import { opcionCaracteristica } from './models/producto';
import { ProductService } from './services/product.service';
import { HttpClient } from '@angular/common/http';
import { environment } from './authService/environment.prod';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit, OnChanges {
  title = 'conectaconfront';
  @ViewChild('stickyMenu', {static:false}) menuElement: ElementRef;

  userLoggin = false;
  public sticky: boolean = false;
  elementPosition: any;

  cantidadProductos:any;

  isLoggedIn$: Observable<boolean>;

  showMenuProfile = false;

  searchCtrl = new FormControl();
  options: Observable<opcionCaracteristica> = null;
  isLoading = false;
  errorMsg: string;

  constructor(
    private matIconRegistry: MatIconRegistry,
    private router: Router,
    private domSanitizer: DomSanitizer,
    private authService: AuthenticationService,
    private globalSrv: StorageServiceService,
    private productServ: ProductService,
    private fb: FormBuilder,
    private http: HttpClient,
    private _snackBar: MatSnackBar
    ) {
    this.matIconRegistry.addSvgIcon(
      "whatsapp",
      this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/whatsapp.svg")
    );
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
  }

  ngOnInit() {
    this.isLoggedIn$ = this.authService.isLoggedIn;
    //console.log(this.isLoggedIn$);
   /* if (localStorage.getItem('currentUser')) {
      this.showMenuProfile = true;
    } else {
      this.showMenuProfile = false;
    }*/

    this.router.events.subscribe(path => {
      this.authService.isLoggedIn.subscribe((value) => {
        this.showMenuProfile = value;
      });
    });

    this.options = this.searchCtrl.valueChanges.pipe(
      startWith(''),
      // delay emits
      debounceTime(300),
      // use switch map so as to cancel previous subscribed events, before creating new once
      switchMap(value => {
        this.isLoading = true;
        if (value !== '') {
          // lookup from github
          this.isLoading = false;
          return this.lookup(value);
        } else {
          // if no value is present, return null
          this.isLoading = false;
          return of(null);
        }
      })
    );
    this.getValuesStorage();
  }

  getValuesStorage() {
    this.globalSrv.itemValue.subscribe((nextValue) => {
      if (nextValue != null) {
        let dataProStorage = JSON.parse(nextValue);
        if (dataProStorage.length != 0) {
          this.cantidadProductos = dataProStorage.length;
        } else {
          this.cantidadProductos = 0;
        }
      };
    })
  }

  lookup(value: string): Observable<opcionCaracteristica> {
    return this.productServ.filterProductByCaract(value.toLowerCase()).pipe(
      // map the item property of the github results as our return object
      map(results => results),
      // catch errors
      catchError(_ => {
        return of(null);
      })
    );
  }

  ngOnChanges() {
    this.getValuesStorage();
  }

  ngAfterViewInit() {
    this.elementPosition = this.menuElement['_elementRef'].offsetTop;
  }

  @HostListener('window:scroll', ['$event'])
    onWindowScroll(e) {
      if (window.pageYOffset > 80) {
        this.sticky = true
      } else {
        this.sticky = false
      }
    }

  logout() {
    if(localStorage.getItem('currentUser')){
      this.authService.logout().subscribe(dataLogout => {
        this._snackBar.open(`${dataLogout['detail']}`, 'ok', {
          duration: 3000,
        });
        this.router.navigate(['/login'])
      });
    }
  }
}
