import { TestBed } from '@angular/core/testing';

import { EpaycoService } from './epayco.service';

describe('EpaycoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EpaycoService = TestBed.get(EpaycoService);
    expect(service).toBeTruthy();
  });
});
