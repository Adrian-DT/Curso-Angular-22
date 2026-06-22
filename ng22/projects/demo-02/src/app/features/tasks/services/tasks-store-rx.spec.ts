import { TestBed } from '@angular/core/testing';

import { TasksStoreRx } from './tasks-store-rx';

describe('TasksStoreRx', () => {
  let service: TasksStoreRx;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TasksStoreRx);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
