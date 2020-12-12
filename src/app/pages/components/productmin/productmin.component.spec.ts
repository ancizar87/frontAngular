import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductminComponent } from './productmin.component';

describe('ProductminComponent', () => {
  let component: ProductminComponent;
  let fixture: ComponentFixture<ProductminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
