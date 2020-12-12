import { Component, OnInit } from '@angular/core';
import { RestorepassService } from 'src/app/services/restorepass.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-restore',
  templateUrl: './restore.component.html',
  styleUrls: ['./restore.component.scss']
})
export class RestoreComponent implements OnInit {

  restorePassForm: FormGroup;
  submitted = false;

  constructor(
    private restore: RestorepassService,
    private formBuilder: FormBuilder,
    private _snackBar: MatSnackBar) { }

  ngOnInit() {
    this.restorePassForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
    });
  }



  onSubmit() {

    // stop here if form is invalid
    if (this.restorePassForm.invalid) {
      this.submitted = false;
      return;
    }
    else{
      this.submitted = true;
      this.restore.restorepass(this.restorePassForm.value).subscribe(data => {
        this._snackBar.open('Debe revisar su bandeja de correo para continuar con el reestablecimiento de contraseña', 'ok', {
          duration: 4000,
        });
        this.submitted = false;
        this.restorePassForm.updateValueAndValidity({
          onlySelf: true
        })
      }, err => {
        this._snackBar.open('Correo no enviado, intente más tarde', 'ok', {
          duration: 4000,
        });
      });

    }
  }

}
