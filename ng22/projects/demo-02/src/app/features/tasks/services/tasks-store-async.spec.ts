import { TestBed } from '@angular/core/testing';

import { TasksStoreAsync } from './tasks-store-async';

describe('TasksStoreAsync', () => {
  let service: TasksStoreAsync;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TasksStoreAsync);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
