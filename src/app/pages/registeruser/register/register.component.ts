import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl, FormGroupDirective } from '@angular/forms';
import { RegisterService } from 'src/app/services/register.service';
import { RestorepassService } from '../../../services/restorepass.service';
import { MatDialog } from '@angular/material/dialog';
import { ModalterminoComponent } from '../../modaltermino/modaltermino.component';

@Component({
  selector: 'app-register ',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']

})

export class RegisterComponent {

  submitted = false;
  paramsRoute = [];
  hide = true;
  politics = true;

  constructor(private _snackBar: MatSnackBar, private router: Router, private rservice: RegisterService, public dialog: MatDialog) {}

  registerForm = new FormGroup(
    {
      email: new FormControl('', [Validators.minLength(2), Validators.email, Validators.required]),
      password: new FormControl('', Validators.minLength(2)),
      confirm: new FormControl('', Validators.minLength(2)),
    },
    passwordMatchValidator
  );

  passwordErrorMatcher = {
    isErrorState: (control: FormControl, registerForm: FormGroupDirective): boolean => {
      const controlInvalid = control.touched && control.invalid;
      const formInvalid = control.touched && this.registerForm.get('confirm').touched && this.registerForm.invalid;
      return controlInvalid || formInvalid;
    }
  }

  confirmErrorMatcher = {
    isErrorState: (control: FormControl, registerForm: FormGroupDirective): boolean => {
      const controlInvalid = control.touched && control.invalid;
      const formInvalid = control.touched && this.registerForm.get('password').touched && this.registerForm.invalid;
      return controlInvalid || formInvalid;
    }
  }

  getErrorMessage(controlName: string) {
    if (this.registerForm.controls[controlName].hasError('minlength')) {
      return 'Must be at least 2 characters'
    }

    return 'Passwords must match'
  }

  public errorHandling = (control: string, error:string) => {
    return this.registerForm.controls[control].hasError(error);
  }


  onSubmitRegister() {
    // stop here if form is invalid
    if (this.registerForm.invalid || this.registerForm.value.email == '' || this.registerForm.value.confirm == '' || this.registerForm.value.password == '') {
      this.submitted = false;
      this._snackBar.open('Primero debe ingresar una contraseña', 'ok', {
        duration: 4000,
      });
      return;
    }
    else{
      const dialogRef = this.dialog.open(ModalterminoComponent);
      dialogRef.afterClosed().subscribe(result => {
      if (result == true){
        this.submitted = true;
        let valueRegister = {'email': this.registerForm.value.email, 'password1':this.registerForm.value.password, 'password2': this.registerForm.value.confirm}
        this.rservice.register(valueRegister).subscribe(data => {
          this._snackBar.open('usuario creado con éxito', 'ok', {
            duration: 4000,
          });
          this.submitted = false;
          this.registerForm.updateValueAndValidity({
            onlySelf: true
          })
          this.router.navigate(['/login']);
        }, err => {
          this._snackBar.open('no se pudo crear el usuario, intente mas tarde', 'ok', {
            duration: 4000,
          });
        });
      } else{
        this._snackBar.open('para continuar acepta nuestras politicas', 'ok', {
          duration: 4000,
        });
      }
    });


    }
  }

}

function passwordMatchValidator(g: FormGroup) {
  const password = g.get('password').value;
  const confirm = g.get('confirm').value
  return password === confirm ? null : { mismatch: true };
}
