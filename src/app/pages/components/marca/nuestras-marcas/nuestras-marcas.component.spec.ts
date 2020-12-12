import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NuestrasMarcasComponent } from './nuestras-marcas.component';

describe('NuestrasMarcasComponent', () => {
  let component: NuestrasMarcasComponent;
  let fixture: ComponentFixture<NuestrasMarcasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NuestrasMarcasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NuestrasMarcasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
