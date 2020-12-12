import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { OrderService } from '../../services/order.service';
import { StatusorderService } from 'src/app/services/statusorder.service';
import * as jwt_decode from 'jwt-decode';
import { UserService } from '../../authService/user.service';

@Component({
  selector: 'app-succes-payment',
  templateUrl: './succes-payment.component.html',
  styleUrls: ['./succes-payment.component.scss']
})
export class SuccesPaymentComponent implements OnInit {
  idparams:any
  checkOrder = {};

  constructor(
    private _router: Router,
    private ordenes: OrderService,
    private activatedRoute: ActivatedRoute,
    private statusorden: StatusorderService,
    private user: UserService
  ) { }

  getDecodedAccessToken(token: string): any {
    try{
        return jwt_decode(token);
    }
    catch(Error){
        return null;
    }
  }

  ngOnInit() {

    let idOrderCheck = (this._router.url).slice(13, -9);

    if (idOrderCheck !== (null || undefined)) {
      this.ordenes.statusOrder(idOrderCheck).subscribe(orden => {
        this.checkOrder = orden['data'];
        if (this.checkOrder['status'] == 'APPROVED') {
          let token = localStorage.getItem('currentUser');
          let tokenInfo = this.getDecodedAccessToken(token);
          let valueTotal = this.checkOrder['amount_in_cents'];
          const totalPayment = JSON.stringify(valueTotal).slice(0,-2);
          let order = [];

          this.user.getCurrentUser().subscribe(userCrrnt => {
            order.push({'usuario': userCrrnt['pk']});
            let orderObj = {
              "usuario": order[0].usuario,
              "estado": "aprobado",
              "precio_total": totalPayment
            };
            this.ordenes.updateOrder(this.checkOrder['reference'], orderObj).subscribe(orderUpdte => {
              setTimeout(() => {
                this._router.navigate(['/home']);
              }, 6000);
            })
          });
        } else {
          setTimeout(() => {
            this._router.navigate(['/home']);
          }, 6000);
        }
      })
    }

    //setTimeout(() => {
      //this._router.navigate(['/home']);
    //}, 6000);
  }

}
