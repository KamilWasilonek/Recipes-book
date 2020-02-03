import { TestBed } from '@angular/core/testing';

import { MealsListService } from './meals-list.service';

describe('MealsListService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MealsListService = TestBed.get(MealsListService);
    expect(service).toBeTruthy();
  });
});
