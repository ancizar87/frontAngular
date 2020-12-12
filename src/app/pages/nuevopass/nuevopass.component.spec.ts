import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NuevopassComponent } from './nuevopass.component';

describe('NuevopassComponent', () => {
  let component: NuevopassComponent;
  let fixture: ComponentFixture<NuevopassComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NuevopassComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NuevopassComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
