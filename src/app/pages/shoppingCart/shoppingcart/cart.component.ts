import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthenticationService } from '../../../authService/authentication.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { ProductService } from '../../../services/product.service';
import { map } from 'rxjs/operators';
import { opcionCaracteristica } from '../../../models/producto';
import { StorageServiceService } from '../../../services/storage-service.service';
import { OrderService } from '../../../services/order.service';
import * as jwt_decode from "jwt-decode";
import { MatDialogRef, MatDialog } from '@angular/material/dialog';
import { OrderModalComponent } from '../../components/order-modal/order-modal.component';
import { UserService } from '../../../authService/user.service';

export interface AllProducts {
  id?: number;
  codigo?: string;
  producto?: string;
  unidadMinima?: number;
  precio?: number;
  totalProducto?: number;
}

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit, AfterViewInit {

  productoStorage = [];
  bigTotal: number;

  showTotales = false;
  removeStateBtn = false;

  showMedida = false;
  unitMedida = 0;

  isLoggedIn$: Observable<boolean>;

  enableBtnShop = true;
  noItems = true;

  timeOut = 3000;

  domicilio = 4000;

  topeDeCompra = 30000;

  orderNo = [];

  totalPay = [];

  @ViewChild('sumaValues', {static: false}) sumaValues: ElementRef;

  @ViewChild('formWomp', {static: false}) formWomp: ElementRef;

  displayedColumns: string[] = ['select', 'codigo', 'producto', 'unidadMinima', 'precio', 'totalProducto'];

  transactions: AllProducts[];

  messageDialog = 'Estamos generando su orden';
  private dialogRef: MatDialogRef<OrderModalComponent>

  data:any;
  dataSource:any;
  selection = new SelectionModel<Element>(true, []);
  constructor(
    private _snackBar: MatSnackBar,
    private authService: AuthenticationService,
    private router: Router,
    private allProduct: ProductService,
    private globalSrv: StorageServiceService,
    private orderMake: OrderService,
    public dialog: MatDialog,
    private user: UserService
    ) {

  }

  ngOnInit() {
    this.isLoggedIn$ = this.authService.isLoggedIn;

    this.isLoggedIn$.subscribe(event => {
      if (event == true) {
        this.enableBtnShop = false
      } else {
        this.enableBtnShop = true
      }
      return this.enableBtnShop;
    });

    this.tableFill();
    this.totalValueP();
  }

  tableFill() {
    let productosAll = JSON.parse(localStorage.getItem('productos'));
    this.productoStorage = productosAll;
    //console.log(this.productoStorage);
    if (this.productoStorage !== null) {
      //console.log(this.productoStorage);
      this.transactions = this.productoStorage;
      this.data = Object.assign(this.transactions);
      //console.log(this.data);
      this.dataSource = new MatTableDataSource<Element>(this.data);
    }
  }

  ngAfterViewInit() {
    //this.calculeTotal()
  }

  totalValueP() {
    if (localStorage.getItem('productos') !== null && JSON.parse(localStorage.getItem('productos')).length !== 0) {
      this.noItems = false;
      let productStorage = JSON.parse(localStorage.getItem('productos'));
      let totalAllProduct = 0;
      for (const product of productStorage) {
        let totalUnit = product.unidades * product.precio;
        totalAllProduct = totalAllProduct + totalUnit;
      }
      this.bigTotal = totalAllProduct
      if(totalAllProduct < this.topeDeCompra){
        this.bigTotal = totalAllProduct + this.domicilio;
        return this.bigTotal;
      }
      return this.bigTotal
    } else {
      this.noItems = true;
      this.bigTotal = 0;
    }
  }

  valueTotal() {
    //localStorage.setItem('productos', JSON.stringify(this.data));
    this.globalSrv.theItem = JSON.stringify(this.data);
    this.totalValueP();
  }

  /*getTotalCost() {
    console.log(this.transactions.map(t => t.totalProducto))
    return this.transactions.map(t => t.totalProducto).reduce((acc, value) => acc + value, 0);
  }*/

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    //this.removeStateBtn = !this.removeStateBtn;
    return numSelected === numRows;
  }

  removeSelectedRows() {
    this.removeStateBtn = true;

    if (this.selection.selected[0] == null) {
      this.removeStateBtn = false;
      this._snackBar.open('Debe seleccionar 1 o más productos para esta acción', 'ok', {
        duration: 4000,
      });
    } else {
      this.selection.selected.forEach(item => {
        let index: number = this.data.findIndex(d => d === item);
        //console.log(this.data.findIndex(d => d === item));
        this.data.splice(index,1);
        //localStorage.setItem('productos', JSON.stringify(this.data));
        this.globalSrv.theItem = JSON.stringify(this.data);
        //this.dataSource = new MatTableDataSource<Element>(this.data);

        this.asyncAction().then(
          () => {
            //console.log('termino');
            this.tableFill();
            this.totalValueP();
            this.removeStateBtn = false;
          }
        );

      });
    }

    this.selection = new SelectionModel<Element>(true, []);
  }

  asyncAction() {
    let promise = new Promise((resolve, reject) => {
      setTimeout(() => {
        this.dataSource = new MatTableDataSource<Element>(this.data);
        resolve();
      }, 1000);
    });

    return promise;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.dataSource.data.forEach(row => this.selection.select(row));
  }

  makeOrder() {
    this.enableBtnShop = true;
    let obtainProduct = JSON.parse(localStorage.getItem('productos'));
    //console.log(obtainProduct);
    let codes = [];

    obtainProduct.forEach(codigos => {
      //console.log(codigos);
      return codes.push(codigos.idOpcionBase);
    });
    let codeStr = codes.toString();

    this.allProduct.getAllProductoFilter(codeStr).subscribe(data => {
      let allProducts = [];
      allProducts.push(data);
      //console.log(allProducts[0]);
      //console.log(codes);
      let msj = [];
      let obMsj = [];
      let invNoEmpty = [];
      allProducts[0].forEach(data => {
        obtainProduct.forEach(pStrg => {
          //console.log(data.id == pStrg.idOpcionBase)
          if (data.id == pStrg.idOpcionBase) {

            if (data.disponibles < pStrg.unidades) {
              let msj = [];
              //console.log('no alcanza el inventario');
              msj = Object.assign(pStrg);
              //console.log(msj)
              //this.enableBtnShop = false;
              return obMsj.push(msj);
            } else {
              let msj = [];
              //console.log('alcanza el inventario');
              msj = Object.assign(pStrg);
              //console.log(msj)
              this.enableBtnShop = false;
              return invNoEmpty.push(msj);
            }
          }
        })
      })
      //console.log(obMsj);
      let uniq = {}
      let arrFiltered = obMsj.filter(obj => !uniq[obj.idOpcionBase] && (uniq[obj.idOpcionBase] = true));
      //console.log('arrFiltered', arrFiltered)

      arrFiltered.forEach((pro, index) => {

        setTimeout(() => {

            this._snackBar.open(`El producto ${pro.producto} sobre pasa el inventario`, 'ok', {
                duration: this.timeOut,
                verticalPosition: 'bottom', // 'top' | 'bottom'
                horizontalPosition: 'end', //'start' | 'center' | 'end' | 'left' | 'right'
                panelClass: ['red-snackbar'],
            });


        }, index * (this.timeOut+500)); // 500 - timeout between two messages

      });

      //console.log(invNoEmpty)

      let unique = {}
      let arrFilteredty = invNoEmpty.filter(obj => !unique[obj.idOpcionBase] && (unique[obj.idOpcionBase] = true));
      //console.log('arrFilteredty', arrFilteredty);

      let token = localStorage.getItem('currentUser');
      let tokenInfo = this.getDecodedAccessToken(token); // decode token
      //console.log(tokenInfo.user_id); // show decoded token object in console

      let order = [];

      this.user.getCurrentUser().subscribe(userCrrnt => {
        console.log(userCrrnt)
        order.push({'usuario': userCrrnt['pk'], 'estado': 'pendiente', 'precio_total': this.bigTotal});

        console.log(order[0].usuario)

        this.totalPay.push({'total': this.bigTotal + '00'});

        this.dialogRef = this.dialog.open(OrderModalComponent, {
          height: '100px',
          disableClose: true,
          data: { messageDialog: this.messageDialog }
        });
        let invoideNro = 0;

        let userAddres = [];
        //let emailUser = localStorage.getItem('email');
        this.user.getAll(order[0].usuario).subscribe(userData => {
          //console.log(userData)
          //userAddres.push(userData[0]['Shipping_Address']);
          //console.log(userAddres[0] !== (null || undefined))

          if (userData[0]['Shipping_Address'] !== undefined && order.length > 0) {
            this.orderMake.makeOrderShop(order).subscribe(resOrder => {
              //console.log(resOrder);
              localStorage.setItem('order', resOrder[0].id);
              this.orderNo.push({'invoiceNo': resOrder[0].invoice_no});
              //console.log(this.orderNo);
              this.dialogRef.close();
              /*invoideNro = resOrder.id;

              console.log(invoideNro)*/

              let productSaveOrder = [];
              arrFilteredty.forEach(prodts => {
                let obtainPro = Object.assign({"producto": prodts.idOpcionBase, "orden": resOrder[0].id, "precio": prodts.precio, "cantidad": prodts.unidades});
                return productSaveOrder.push(obtainPro);
              })

              //console.log(productSaveOrder);

              this.messageDialog = 'Un momento, ya casí terminamos'
              this.dialogRef = this.dialog.open(OrderModalComponent, {
                height: '100px',
                disableClose: true,
                data: { messageDialog: this.messageDialog }
              });

              this.orderMake.saveProductsByOrder(productSaveOrder).subscribe(resProducts => {
                //console.log(resProducts)
                this.dialogRef.close();
                this.messageDialog = 'Será redirigido a la opción de pago.';
                this.dialogRef = this.dialog.open(OrderModalComponent, {
                  height: '100px',
                  disableClose: true,
                  data: { messageDialog: this.messageDialog }
                });
                //let formOrder = document.querySelectorAll('#formWomp');
                //console.log(formOrder);
                this.globalSrv.theItem = JSON.stringify([]);
                this.formWomp.nativeElement.submit();
                /*if (formOrder.length) {
                  formOrder[0].submit();
                }*/
                setTimeout(() => {
                  this.dialogRef.close();
                  this.enableBtnShop = false
                }, 2000);
              }, err => {
                this._snackBar.open('Error al crear la orden intente más tarde', 'ok', {
                  duration: 4000,
                });
                this.dialogRef.close();
                this.enableBtnShop = false
              })
            }, err => {
              this._snackBar.open('Error al crear la orden intente más tarde', 'ok', {
                duration: 4000,
              });
              this.dialogRef.close();
              this.enableBtnShop = false
            });
          } else {
            this._snackBar.open('Debe proporcionar una dirección fisica para la entrega', 'ok', {
              duration: 4000,
            }).onAction()
            .subscribe(() => this.router.navigateByUrl('user-panel'));
            this.dialogRef.close();
            this.enableBtnShop = false
          }
        });
      }, err => {
        this._snackBar.open('Por favor ingresar para finalizar su compra', 'ok', {
          duration: 4000,
        });
      })
    });

  }

  getDecodedAccessToken(token: string): any {
    try{
        return jwt_decode(token);
    }
    catch(Error){
        return null;
    }
  }

}

export interface Element {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}
