import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CantacComponent } from './cantac.component';

describe('CantacComponent', () => {
  let component: CantacComponent;
  let fixture: ComponentFixture<CantacComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CantacComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CantacComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
