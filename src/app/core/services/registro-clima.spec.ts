import { TestBed } from '@angular/core/testing';

import { RegistroClima } from './registro-clima';

describe('RegistroClima', () => {
  let service: RegistroClima;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RegistroClima);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
