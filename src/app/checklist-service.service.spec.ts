import { TestBed } from '@angular/core/testing';

import { ChecklistServiceService } from './checklist-service.service';

describe('ChecklistServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ChecklistServiceService = TestBed.get(ChecklistServiceService);
    expect(service).toBeTruthy();
  });
});
