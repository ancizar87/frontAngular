import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SlidercarruselComponent } from './slidercarrusel.component';

describe('SlidercarruselComponent', () => {
  let component: SlidercarruselComponent;
  let fixture: ComponentFixture<SlidercarruselComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SlidercarruselComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SlidercarruselComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
