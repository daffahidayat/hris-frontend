import { TestBed } from '@angular/core/testing';

import { Absen } from './absen';

describe('Absen', () => {
  let service: Absen;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Absen);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
