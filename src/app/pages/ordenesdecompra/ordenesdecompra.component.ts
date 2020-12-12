import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OrderService } from '../../services/order.service';
import * as jwt_decode from 'jwt-decode';
import { ProductService } from '../../services/product.service';
import { UserService } from '../../authService/user.service';

@Component({
  selector: 'app-ordenesdecompra',
  templateUrl: './ordenesdecompra.component.html',
  styleUrls: ['./ordenesdecompra.component.scss']
})
export class OrdenesdecompraComponent implements OnInit {

  page: any;
  paramsSub: any;

  orden: any;

  itemsOrder: any;

  panelOpenState = false;
  disableEXpand = false;
  userName = [];

  constructor(
    private userService: UserService,
    private activatedRoute: ActivatedRoute,
    private order: OrderService,
    private allProduct: ProductService) { }

  ngOnInit() {
    this.paramsSub = this.activatedRoute.params.subscribe(
      params => (this.page = params['page']));

      this.getOrders();
  }

  getOrders(){
    this.userService.getCurrentUser().subscribe(getCurrentUsr => {
      if (getCurrentUsr !== undefined) {
        this.userName.push({'user': getCurrentUsr['username'], 'idUser': getCurrentUsr['pk']});
        this.order.getOrder(this.userName[0].idUser).subscribe(data => {
          this.orden = data;
        })
      }
    });
  }

  nameProducts = [];

  products(id) {
    this.disableEXpand = true;
    this.nameProducts = [];
    let arrProducts = [];
    this.itemsOrder = [];
    this.order.getOrderItem(id).subscribe(items => {
      this.itemsOrder = items;
      let productsId = [];
      this.itemsOrder.forEach(products => {
        productsId.push(products.producto);
        let idProds = productsId.toString();
        this.allProduct.getAllProductoFilter(idProds).subscribe(caractProd => {
          let productName = [];
          productName.push(caractProd);
          productName.forEach(elemts => {
            elemts.forEach(productDetail => {
              let newOrder = Object.assign(
                {
                  'codigo': productDetail.codigoP,
                  'nombre':productDetail.descripcion,
                  'cantidad': products.cantidad,
                  'precio': productDetail.precio
                }
              );
              arrProducts.push(newOrder)
              let collection = [];
              collection = arrProducts.filter((test, index, array) =>
                index === array.findIndex((findTest) =>
                    findTest.codigo === test.codigo
                )
              );
              this.itemsOrder = collection;
              this.disableEXpand = false;
            })

          })
        })
      })

    })
  }

  getDecodedAccessToken(token: string): any {
    try{
        return jwt_decode(token);
    }
    catch(Error){
        return null;
    }
  }

  ngOnDestroy() {
    this.paramsSub.unsubscribe();
  }

}
