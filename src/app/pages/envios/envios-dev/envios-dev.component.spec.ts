import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EnviosDevComponent } from './envios-dev.component';

describe('EnviosDevComponent', () => {
  let component: EnviosDevComponent;
  let fixture: ComponentFixture<EnviosDevComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EnviosDevComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EnviosDevComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
