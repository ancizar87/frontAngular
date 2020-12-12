import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit, ViewChild, ElementRef, TemplateRef, ContentChild, AfterViewInit } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { NgxGalleryOptions, NgxGalleryImage, NgxGalleryAnimation } from 'ngx-gallery';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';
import { environment } from './../../../authService/environment.prod';
import { MatSnackBar } from '@angular/material/snack-bar';
//import { Observable, combineLatest } from 'rxjs';
//import 'rxjs/add/observable/combineLatest';
import { StorageServiceService } from '../../../services/storage-service.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {

  url = environment.apiUrl;
  galleryOptions: NgxGalleryOptions[];
  galleryImages: NgxGalleryImage[];

  showMedida = false;
  quantity = false;

  OutTimechangeProduct: boolean = false;

  submitted = false;

  productsAll = [];
  productoUnique = [];
  productoPrint = [];

  priceProduct: any;
  minQuantity: any;
  maxQuantity: any;
  unitMedida: any;
  totalProductos: any;

  detailImage = [];

  minVal = [];
  maxVal = [];
  quantityActual:any;

  productRegisterForm: FormGroup;

  @ViewChild('cantProduct', { static: true }) cantProduct: ElementRef;

  constructor(
    private _snackBar: MatSnackBar,
    private matIconRegistry: MatIconRegistry,
    private formBuilder: FormBuilder,
    private domSanitizer: DomSanitizer,
    private route: ActivatedRoute,
    private allProduct: ProductService,
    private router: Router,
    private globalSrv: StorageServiceService) {
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

  values = [];
  parameter = [];

  ngOnInit() {
    // Cada vez que el parametro de la ruta cambia
    // se debe suscribir al cambio de rutas para volver a cargar
    // la funcion que construye el detalle de producto "invoqueProduct()"
    // pasandole el parametro de la ruta routerParams.id
    this.route.queryParams.subscribe(queryParams => {
      this.route.params.subscribe(routeParams => {
        this.parameter = []
        this.invoqueProduct(routeParams.id);
        this.parameter.push(routeParams.id)
      });
    });

    this.galleryOptions = [
      {
        width: '100%',
        height: '549px',
        thumbnailsColumns: 4,
        imageAnimation: NgxGalleryAnimation.Slide,
        previewCloseOnEsc: true,
        previewCloseOnClick: true,
      },
      {
        breakpoint: 1279,
        width: '100%',
        height: '500px',
        imagePercent: 90,
        thumbnailsColumns: 3,
      },
      {
        breakpoint: 959,
        width: '100%',
        height: '549px',
        imagePercent: 90,
        thumbnailsColumns: 6,
      },
      {
        breakpoint: 767,
        width: '100%',
        height: '549px',
        imagePercent: 90,
        thumbnailsColumns: 3,
      },
      {
        breakpoint: 599,
        thumbnailsColumns: 3,
        width: '98%',
        height: '400px'
      }
    ];
  }

  public errorHandling = (control: string, error: string) => {
    return this.productRegisterForm.controls[control].hasError(error);
  }

  newQuantity: number;
  productsAdd = [];

  cambioValor() {
    let getValueChange = this.cantProduct.nativeElement.value;

    this.newQuantity = getValueChange;
  }

  sendProductCart() {
    let getValue = this.cantProduct.nativeElement.value;
    let minGetVal = this.cantProduct.nativeElement.min;
    let maxGetVal = this.cantProduct.nativeElement.max;

    let oneProduct = {}
    let allProductSaved = []
    //console.log(getValue, maxGetVal)
    if (parseInt(getValue) < parseInt(minGetVal)) {
      this._snackBar.open('Cantidad minima no permitida', 'ok', {
        duration: 2000,
      });
    } else if (parseInt(getValue) > parseInt(maxGetVal)) {
      //console.log(getValue < maxGetVal, parseInt(getValue), parseInt(maxGetVal))
      this._snackBar.open('Cantidad maxima superada', 'ok', {
        duration: 2000,
      });
    } else if(parseInt(getValue) < parseInt(maxGetVal)) {
      //console.log('puede comprar')
      let opcionesProduct = [];
      this.productoPrint[0].opcionCaracteristica.forEach(element => {
        if (element.codigoP == this.parameter[0]) {
          //console.log(element)
          opcionesProduct.push(element)
          //console.log(opcionesProduct)
          oneProduct = Object.assign({ 'id': this.productoPrint[0].id, 'producto': element.descripcion, 'idOpcionBase': element.id, 'codigo': element.codigoP,  'unidadMedida':element.UMedida, 'unidades': parseInt(getValue), 'unidadMinima': element.minimo, 'unidMax':element.disponibles, 'precio': element.precio })
          //console.log(oneProduct)

          if (localStorage.getItem('productos') != (undefined || null)) {
            let storage = JSON.parse(localStorage.getItem('productos'));

            this.productsAdd = Object.assign(storage);

            //console.log(oneProduct['id'])
            this.productsAdd.push(oneProduct);

            let productoActual = this.productsAdd.filter(item => item.id == oneProduct['id']);
            //console.log(productoActual)
            if (productoActual.length > 1) {

              this.productsAdd = [];

              allProductSaved.push(JSON.parse(localStorage.getItem('productos')));
              let newProduct = [];

              newProduct = allProductSaved[0].filter(x => x.codigo == oneProduct['codigo']);
              //console.log(newProduct)
              if (newProduct.length == 1) {
                //console.log(oneProduct);
                //console.log(newProduct);
                //console.log(allProductSaved[0]);
                if (newProduct[0].unidad != oneProduct['unidades']) {
                  //console.log('las unidad son diferentes');
                  let onlyProducts = allProductSaved[0].filter(x => x.codigo != oneProduct['codigo']);
                  onlyProducts.push(oneProduct);
                  //console.log(onlyProducts);
                  this.productsAdd = onlyProducts;
                  //console.log(this.productsAdd);
                  //localStorage.setItem('productos', JSON.stringify(this.productsAdd))
                  this.globalSrv.theItem = JSON.stringify(this.productsAdd);
                  //allProductSaved[0].push(oneProduct);
                  //console.log(allProductSaved[0]);
                } else {
                  //console.log('las unidad NO son diferentes')

                }
                //allProductSaved[0].push(newProduct[0])
              } else {
                //console.log(oneProduct)
                allProductSaved[0].push(oneProduct);
                //console.log(allProductSaved[0])
                this.productsAdd = allProductSaved[0];
                //console.log(this.productsAdd)
                //localStorage.setItem('productos', JSON.stringify(this.productsAdd))
                this.globalSrv.theItem = JSON.stringify(this.productsAdd);
                /*
                console.log(oneProduct);
                console.log(allProductSaved[0]);
                */
              }

            } else {
              //localStorage.setItem('productos', JSON.stringify(this.productsAdd));
              this.globalSrv.theItem = JSON.stringify(this.productsAdd);
            }

            //localStorage.setItem('productos', JSON.stringify(this.productsAdd))

          } else {
            //console.log('se crea por primera vez', oneProduct)
            this.productsAdd = [];
            this.productsAdd.push(oneProduct)
            //localStorage.setItem('productos', JSON.stringify(this.productsAdd))
            this.globalSrv.theItem = JSON.stringify(this.productsAdd);
          }
        }
      });
    }
  }

  async invoqueProduct(param?) {

    let idParam = param//this.route.params['_value'].id;
    this.OutTimechangeProduct = true;
    this.allProduct.getProductDetail(idParam).subscribe(products => {
      //console.log('entro aca')
      // almacenamos todos los productos en una variable publica
      this.productsAll.push(products);
      let productoU = [];
      let prodU = [];
      let arrProducto = [];
      let imageObj = {}
      // recorremos todos los productos y los almacenamos en un arreglo
      this.productsAll.forEach(element => {
        element.forEach(uniqueProduct => {
          this.productoUnique.push(uniqueProduct);
        });
      });
      this.productoUnique.forEach(productos => {
        productoU.push(productos);
      });

      productoU.forEach(unico => {
        arrProducto.push(unico)
      })
      arrProducto.forEach(dataProducto => {
        prodU.push(dataProducto);
        dataProducto.opcionCaracteristica.forEach(elementP => {
          // filtramos el arreglo por el parametro "idParam" que llega en la url
          if (elementP.codigoP == idParam) {
            this.productoPrint.push(dataProducto)
          }
        });
      });

      this.minVal = [];
      this.maxVal = [];
      // Obtenemos el precio del producto
      // filtramos el producto por el parametro que llega en "idParam"
      this.productoPrint.forEach(price => {
        let filterPrice = price.opcionCaracteristica.filter(price => price.codigoP == idParam);
        if (filterPrice.length > 0) {

          // Como el producto filtrado llega en forma de array la
          //ubicacion del objeto por defecto siempre [0]
          this.priceProduct = filterPrice[0].precio;
          // Almacenamos la cantidad minima de productos a comprar
          // validamos si existe storage con una cantidad diferente
          if(localStorage.getItem('productos')) {
            let almacene = [];
            almacene.push(JSON.parse(localStorage.getItem('productos')));
            //console.log(almacene);
            let prodIn = [];
            let allArrayP = almacene[0];
            let inProd = [];
            for (const pelement of allArrayP) {
              //console.log(pelement.codigo, idParam);
              inProd.push(pelement);
              let objProd = inProd.filter(x => x.codigo == idParam);
              //console.log(objProd)
              if (objProd.length != 0) {
                //this.quantityActual = 0;
                //console.log(pelement)
                prodIn.push(pelement);
                let cantidadActual = prodIn[0];
                this.quantityActual = cantidadActual.unidades;
                //console.log(this.quantityActual);
              } else {
                //console.log('tambien entra aca')
                //this.quantityActual = 0;
                this.quantityActual = filterPrice[0].minimo;
              }
            }
          } else {
            this.quantityActual = filterPrice[0].minimo;
          }
          this.minQuantity = filterPrice[0].minimo;
          // Almacenamos la cantidad maxima de productos a comprar
          this.maxQuantity = filterPrice[0].disponibles;
          // Almacenamos la unidad de medida
          if (filterPrice[0].UMedida == "Metros") {
            this.showMedida = true;
            //console.log('tiene unidad de medida en metros')
            this.unitMedida = "M";
          } else {
            this.showMedida = false;
          }

          this.OutTimechangeProduct = false;
          //console.log(this.priceProduct);
        }
      })

      this.minVal.push(this.minQuantity)
      //console.log(this.minVal[0])
      this.maxVal.push(this.maxQuantity)
      //console.log(this.maxVal[0])

      // Obtención de imágenes
      // Nos basamos en el array pusheado para recorrerlo y llegar
      // hasta la posición del arreglo imagenes
      this.productoPrint.forEach(images => {
        // ¡IMPORTANTE! se debe vaciar el arreglo antes
        // de recorrer el arreglo de imagenes
        this.detailImage = []
        images.imagenes.forEach(element => {
          // se crea un objeto por cada imagen que llega y se asigna la url del backend
          // y se le envía la posición del arreglo para obtener el vinculo imagen
          imageObj = Object.assign(
            {
              small: element.image,
              medium: element.image,
              big: element.image
            }
          );
          // Se agregan los objetos obtenidos de imagenes para convertirlos
          // en un array tal como lo requiere la librería de la galería de imágenes
          this.detailImage.push(imageObj)
        });

        this.galleryImages = this.detailImage;

      })

    });
  }

}
