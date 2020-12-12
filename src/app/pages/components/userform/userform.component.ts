import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from '../../../authService/user.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-userform',
  templateUrl: './userform.component.html',
  styleUrls: ['./userform.component.scss']
})
export class UserformComponent implements OnInit {

  userForm: FormGroup;

  dataForm = [];

  enabledForm = false;

  enviando = true;

  page: any;
  paramsSub: any;
  userName = [];

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private _snackBar: MatSnackBar,
    private activatedRoute: ActivatedRoute
    ) { }

  ngOnInit() {

    this.paramsSub = this.activatedRoute.params.subscribe(
      params => (this.page = params['page']));

    this.userForm = this.formBuilder.group({
      first_name: ['', [Validators.required]],
      last_name: ['', [Validators.required]],
      identificacion: ['', [Validators.required]],
      whatsapp: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      Shipping_Address: ['', [Validators.required]],
    });

    this.disabledEnabled();

    let emailUser = localStorage.getItem('email');
    emailUser = JSON.parse(emailUser);

    this.userService.getCurrentUser().subscribe(getCurrentUsr => {
      if (getCurrentUsr !== undefined) {
        this.userName.push({'user':getCurrentUsr['username'], 'idUser': getCurrentUsr['pk']});


        this.userForm.get('email').setValue(getCurrentUsr['email']);
        this.userForm.get('first_name').setValue(getCurrentUsr['first_name']);
        this.userForm.get('last_name').setValue(getCurrentUsr['last_name']);
        /*this.userForm.get('identificacion').setValue(data['identificacion']);
        this.userForm.get('whatsapp').setValue(data['whatsapp']);
        this.userForm.get('Shipping_Address').setValue(data['Shipping_Address']);*/

        this.userService.getAll(getCurrentUsr['pk']).subscribe(data => {
          if (data.length > 0) {

            this.userForm.get('identificacion').setValue(data[0].identification);
            this.userForm.get('whatsapp').setValue(data[0].whatsapp);
            this.userForm.get('Shipping_Address').setValue(data[0].Shipping_Address);
          }
        })

      }
    })

  }

  public errorHandling = (control: string, error:string) => {
    return this.userForm.controls[control].hasError(error);
  }

  disabledEnabled() {
    if (this.enabledForm == false) {
      this.enabledForm = !this.enabledForm;
      this.userForm.get('first_name').disable();
      this.userForm.get('last_name').disable();
      this.userForm.get('identificacion').disable();
      this.userForm.get('whatsapp').disable();
      this.userForm.get('email').disable();
      this.userForm.get('Shipping_Address').disable();
    } else {
      this.enabledForm = !this.enabledForm;

      if (
        this.userForm.get('first_name').value == "" ||
        this.userForm.get('last_name').value == ""
        ) {
          this.userForm.get('first_name').enable();
          this.userForm.get('last_name').enable();
          this.userForm.get('identificacion').enable();
          this.userForm.get('whatsapp').enable();
          this.userForm.get('Shipping_Address').enable();
          this.userForm.get('email').disable();
        } else {
          this.userForm.get('whatsapp').enable();
          this.userForm.get('Shipping_Address').enable();
        }

      return this.enviando = false;
    }
  }

  onSubmitUser() {
    let userData = [];
    let currentUpdate = {};
    this.enviando = true;

    let whatsapp = this.userForm.get('whatsapp').value;
    let address = this.userForm.get('Shipping_Address').value;
    let userDoc = this.userForm.get('identificacion').value;

    userData.push(
      {
        'usuario': parseInt(this.userName[0].idUser),
        'identification': userDoc,
        'whatsapp': whatsapp,
        'Shipping_Address': address
      }
    );
    currentUpdate = Object.assign
    (
      {
        'username': this.userName[0].user,
        'first_name': this.userForm.get('first_name').value,
        'last_name': this.userForm.get('last_name').value
      }
    );
    let userDataUpdate = userData;

    this.disabledEnabled();
    this.userService.updateCurrentUser(currentUpdate).subscribe(udateUser => {

      this.userService.getAll(this.userName[0].idUser).subscribe(data => {


        if(data[0] !== undefined) {
          this.userService.userUpdate(this.userName[0].idUser, userDataUpdate).subscribe(data => {
            // this.disabledEnabled();
              this._snackBar.open('Sus datos se actualizaron con exito', 'ok', {
                duration: 4000,
              });
              return this.enviando = false;
            }, err => {
            // this.disabledEnabled();
              this._snackBar.open('Ocurrió un error, intente más tarde', 'ok', {
                duration: 4000,
              });
              return this.enviando = false;
          })
        } else {


          this.userService.userCreateData(userDataUpdate).subscribe(data => {
            // this.disabledEnabled();
              this._snackBar.open('Sus datos se actualizaron con exito', 'ok', {
                duration: 4000,
              });
              return this.enviando = false;
            }, err => {
            // this.disabledEnabled();
              this._snackBar.open('Ocurrió un error, intente más tarde', 'ok', {
                duration: 4000,
              });
              return this.enviando = false;
            })
        }
      }, err => {
        this._snackBar.open('Ocurrió un error, intente más tarde', 'ok', {
          duration: 4000,
        });
        return this.enviando = false;
      })

    });
  }

  ngOnDestroy() {
    this.paramsSub.unsubscribe();
  }

}
