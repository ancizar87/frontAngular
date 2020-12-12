import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalterminoComponent } from './modaltermino.component';

describe('ModalterminoComponent', () => {
  let component: ModalterminoComponent;
  let fixture: ComponentFixture<ModalterminoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalterminoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalterminoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
