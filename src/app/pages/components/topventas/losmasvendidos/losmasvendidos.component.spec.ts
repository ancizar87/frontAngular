import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LosmasvendidosComponent } from './losmasvendidos.component';

describe('LosmasvendidosComponent', () => {
  let component: LosmasvendidosComponent;
  let fixture: ComponentFixture<LosmasvendidosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LosmasvendidosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LosmasvendidosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
