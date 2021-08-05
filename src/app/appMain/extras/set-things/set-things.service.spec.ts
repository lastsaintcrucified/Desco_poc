import { TestBed } from '@angular/core/testing';

import { SetThingsService } from './set-things.service';

describe('SetThingsService', () => {
  let service: SetThingsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SetThingsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
