import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl, FormGroupDirective } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { RestorepassService } from '../../services/restorepass.service';

@Component({
  selector: 'app-nuevopass',
  templateUrl: './nuevopass.component.html',
  styleUrls: ['./nuevopass.component.scss']
})
export class NuevopassComponent   {

  submitted = false;
  paramsRoute = [];

  constructor(private _snackBar: MatSnackBar, private route: ActivatedRoute, private restore: RestorepassService) {
    this.route.queryParams.subscribe(params => {
      this.paramsRoute.push(params['token']);
    })
  }

  form = new FormGroup(
    {
      password: new FormControl('', Validators.minLength(2)),
      confirm: new FormControl('', Validators.minLength(2)),
    },
    passwordMatchValidator
  );

  passwordErrorMatcher = {
    isErrorState: (control: FormControl, form: FormGroupDirective): boolean => {
      const controlInvalid = control.touched && control.invalid;
      const formInvalid = control.touched && this.form.get('confirm').touched && this.form.invalid;
      return controlInvalid || formInvalid;
    }
  }

  confirmErrorMatcher = {
    isErrorState: (control: FormControl, form: FormGroupDirective): boolean => {
      const controlInvalid = control.touched && control.invalid;
      const formInvalid = control.touched && this.form.get('password').touched && this.form.invalid;
      return controlInvalid || formInvalid;
    }
  }

  getErrorMessage(controlName: string) {
    if (this.form.controls[controlName].hasError('minlength')) {
      return 'Must be at least 2 characters'
    }

    return 'Passwords must match'
  }

  onSubmit() {

    // stop here if form is invalid
    if (this.form.invalid || this.form.value.confirm == '' || this.form.value.password == '') {
      this.submitted = false;
      this._snackBar.open('Primero debe ingresar una contraseña', 'ok', {
        duration: 4000,
      });
      return;
    }
    else{
      this.submitted = true;
      let valueNewPass = {'password':this.form.value.confirm, 'token': this.paramsRoute.toString()}
      this.restore.newPass(valueNewPass).subscribe(data => {
        this._snackBar.open('Su contraseña se ha reestablecido', 'ok', {
          duration: 4000,
        });
        this.submitted = false;
        this.form.updateValueAndValidity({
          onlySelf: true
        })
      }, err => {
        this._snackBar.open('Por favor solicite nuevamente el reestablecimiento de la contraseña', 'ok', {
          duration: 4000,
        });
      });

    }
  }

}

function passwordMatchValidator(g: FormGroup) {
  const password = g.get('password').value;
  const confirm = g.get('confirm').value
  return password === confirm ? null : { mismatch: true };
}
