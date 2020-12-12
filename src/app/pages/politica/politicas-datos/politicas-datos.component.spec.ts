import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PoliticasDatosComponent } from './politicas-datos.component';

describe('PoliticasDatosComponent', () => {
  let component: PoliticasDatosComponent;
  let fixture: ComponentFixture<PoliticasDatosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PoliticasDatosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PoliticasDatosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
