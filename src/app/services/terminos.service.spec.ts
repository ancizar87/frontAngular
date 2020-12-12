import { TestBed } from '@angular/core/testing';

import { TerminosService } from './terminos.service';

describe('TerminosService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TerminosService = TestBed.get(TerminosService);
    expect(service).toBeTruthy();
  });
});
