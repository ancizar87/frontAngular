import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductomesComponent } from './productomes.component';

describe('ProductomesComponent', () => {
  let component: ProductomesComponent;
  let fixture: ComponentFixture<ProductomesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductomesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductomesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
