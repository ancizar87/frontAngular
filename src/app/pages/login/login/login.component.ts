import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from 'src/app/authService/authentication.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { StorageServiceService } from '../../../services/storage-service.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  public loginInvalid: boolean;
  private formSubmitAttempt: boolean;
  private returnUrl: string;

  enviando = false;

  constructor(private formBuilder: FormBuilder,
      private route: ActivatedRoute,
      private router: Router,
      private authenticationService: AuthenticationService,
      private _snackBar: MatSnackBar,
      private globalSrv: StorageServiceService
      ) {

      // redirect to home if already logged in
      if (this.authenticationService.currentUserValue) {
          this.router.navigate(['/']);
      }

   }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }

  public errorHandling = (control: string, error:string) => {
    return this.loginForm.controls[control].hasError(error);
  }

  onSubmitlogin() {
    this.enviando = true;
    this.loginInvalid = false;
    this.formSubmitAttempt = false;
    if (this.loginForm.valid) {
      try {
        const email = this.loginForm.get('email').value;
        localStorage.setItem('email', JSON.stringify(email));
        const password = this.loginForm.get('password').value;
        this.authenticationService.login(email, password).subscribe(res => {
          this.router.navigate(['/']);
        }, err => {
          this._snackBar.open('Usuario o contraseña no valido', 'ok', {
            duration: 2000,
          });
          this.enviando = false;
        });
      } catch (err) {
        this.loginInvalid = true;
      }
    } else {
      this.formSubmitAttempt = true;
      this.enviando = false;
    }
  }

}
