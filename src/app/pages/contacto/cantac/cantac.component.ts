import { MatSnackBar } from '@angular/material/snack-bar';
import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { ContactoService } from 'src/app/services/contacto.service';

@Component({
  selector: 'app-cantac',
  templateUrl: './cantac.component.html',
  styleUrls: ['./cantac.component.scss']
})
export class CantacComponent implements OnInit {

  public expand = true;
  public hideExp: boolean = true;

  contactForm: FormGroup;
  submitted = false;

  texto: string = 'Conecta con ingeniería';
  lat: number = 4.716123;
  lng: number = -74.053403;
  zoom: number = 15;

  constructor(private formBuilder: FormBuilder, public breakpointObserver: BreakpointObserver, private contact: ContactoService, private _snackBar: MatSnackBar) { }

  ngOnInit() {
    this.contactForm = this.formBuilder.group({
      nombres: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      telefono: ['', [Validators.required]],
      message: ['', [Validators.required]],
    });
    this.breakpointObserver
      .observe(['(max-width: 1279px)'])
      .subscribe((state: BreakpointState) => {
        if (state.matches) {
          this.expand = false;
          this.hideExp = false;
        } else {
          this.hideExp = true;
          this.expand = true;
        }
      });
  }

  clickedMarker(){
    window.open('https://www.google.com.co/maps/place/Conecta+con+Ingenier%C3%ADa/@4.7161022,-74.0539602,19z/data=!4m12!1m6!3m5!1s0x8e3f8548075d1be9:0xd20a885a69cdf4e6!2sConecta+con+Ingenier%C3%ADa!8m2!3d4.7161022!4d-74.053413!3m4!1s0x8e3f8548075d1be9:0xd20a885a69cdf4e6!8m2!3d4.7161022!4d-74.053413?hl=es&authuser=0','_blank'
   )}

  public errorHandling = (control: string, error: string) => {
    return this.contactForm.controls[control].hasError(error);
  }

  onSubmit() {

    // stop here if form is invalid
    if (this.contactForm.invalid) {
      this.submitted = false;
      return;
    }
    else{
      this.submitted = true;
      this.contact.contacto(this.contactForm.value).subscribe(data => {
        this._snackBar.open('Mensaje enviado correctamente', 'ok', {
          duration: 4000,
        });
        this.submitted = false;
        this.contactForm.updateValueAndValidity({
          onlySelf: true
        })
      });
      
    }

    // display form values on success
    //alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.contactForm.value, null, 4));
  }

}
