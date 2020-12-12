import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NuestrosclientesComponent } from './nuestrosclientes.component';

describe('NuestrosclientesComponent', () => {
  let component: NuestrosclientesComponent;
  let fixture: ComponentFixture<NuestrosclientesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NuestrosclientesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NuestrosclientesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
