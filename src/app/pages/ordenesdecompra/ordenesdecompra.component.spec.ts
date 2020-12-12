import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrdenesdecompraComponent } from './ordenesdecompra.component';

describe('OrdenesdecompraComponent', () => {
  let component: OrdenesdecompraComponent;
  let fixture: ComponentFixture<OrdenesdecompraComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrdenesdecompraComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrdenesdecompraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
