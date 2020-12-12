import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SuccesPaymentComponent } from './succes-payment.component';

describe('SuccesPaymentComponent', () => {
  let component: SuccesPaymentComponent;
  let fixture: ComponentFixture<SuccesPaymentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SuccesPaymentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SuccesPaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
