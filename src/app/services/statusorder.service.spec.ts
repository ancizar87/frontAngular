import { TestBed } from '@angular/core/testing';

import { StatusorderService } from './statusorder.service';

describe('StatusorderService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: StatusorderService = TestBed.get(StatusorderService);
    expect(service).toBeTruthy();
  });
});
