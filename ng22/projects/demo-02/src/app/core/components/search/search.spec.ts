import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Search } from './search';
import { By } from '@angular/platform-browser';

describe('Search', () => {
  let component: Search;
  let fixture: ComponentFixture<Search>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Search],
    }).compileComponents();

    fixture = TestBed.createComponent(Search);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  const prepareInput = () => {
    const inputDebug = fixture.debugElement.query(By.css('input'));
    const input = inputDebug.nativeElement as HTMLInputElement;
    input.value = 'test';
    //inputDebug.triggerEventHandler('input', { target: input });
    input.dispatchEvent(new Event('input'));
    fixture.detectChanges();
  };

  it('should write the search term', () => {
    prepareInput();
    // Test de implementación
    expect(component['searchQuery']()).toBe('test');
    // Test de funcionalidad
    const spanDebug = fixture.debugElement.query(By.css('span'));
    const span = spanDebug.nativeElement as HTMLSpanElement;
    expect(span.textContent).toBe('Buscando test');
  });

  it('should reset the search term', () => {
    prepareInput();
    // Test de funcionalidad
    const buttonDebug = fixture.debugElement.query(By.css('button'));
    buttonDebug.triggerEventHandler('click', null);
    fixture.detectChanges();
    const spanDebug = fixture.debugElement.query(By.css('span'));
    const span = spanDebug.nativeElement as HTMLSpanElement;
    expect(span.textContent).toBe('Esperando');
  });
});
