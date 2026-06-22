import { TestBed } from '@angular/core/testing';

import { TasksStoreSignal } from './tasks-store-signal';

describe('TasksStoreSignal', () => {
  let service: TasksStoreSignal;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TasksStoreSignal);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
