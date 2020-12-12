import { TestBed } from '@angular/core/testing';

import { RestorepassService } from './restorepass.service';

describe('RestorepassService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RestorepassService = TestBed.get(RestorepassService);
    expect(service).toBeTruthy();
  });
});
