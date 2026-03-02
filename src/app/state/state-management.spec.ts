import { TestBed } from '@angular/core/testing';

import { StateManagement } from './state-management';

describe('StateManagement', () => {
  let service: StateManagement;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StateManagement);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
