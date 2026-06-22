import { TestBed } from '@angular/core/testing';
import { ApiRepo } from './api-repo';

describe('ApiRepo', () => {
  let service: ApiRepo;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiRepo);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should have the correct apiUrl', () => {
    const expectedApiUrl = 'http://localhost:3000/notes'; // Cambia esto según tu configuración de entorno
    expect(service.apiUrl).toBe(expectedApiUrl);
  });
});
