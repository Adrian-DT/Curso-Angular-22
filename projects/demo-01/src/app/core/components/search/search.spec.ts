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

  // Función preparatoria para implementar en más de un test cuando se repiten procesos de comprobar input
  const prepareInput = () => {
    // const input = fixture.nativeElement.querySelector('input');
    const inputDebug = fixture.debugElement.query(By.css('input'))
    const input = inputDebug.nativeElement as HTMLInputElement;
    input.value = 'test';
    // inputDebug.triggerEventHandler('input', {target: input});
    input.dispatchEvent(new Event('input'));
    fixture.detectChanges();
  }

  // Test que simula el proceso de escribir y la signal recoge el valor
  it('should write the search term', () => {
    prepareInput();
    // Test de implementación, accedemos a la función del componente y leemos su valor
    expect(component['searchQuery']()).toBe('test');
    // Test de funcionalidad, comprobamos que el span se actualiza con el valor esperado
    const spanDebug = fixture.debugElement.query(By.css('span'));
    const span = spanDebug.nativeElement as HTMLSpanElement
    expect(span.textContent).toBe('Buscando test')

  });

  // Test para comprobar la funcionalidad del botón reset, que elimina el valor del input, porl o que el span muestra "Esperando"
  it('should reset the search term', () => {
    expect(component).toBeTruthy();
    // const input = fixture.nativeElement.querySelector('input');
    const inputDebug = fixture.debugElement.query(By.css('input'))
    const input = inputDebug.nativeElement as HTMLInputElement
    input.value = '';
    // inputDebug.triggerEventHandler('input', {target: input});
    input.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    // Test de implementación, accedemos a la función del componente y leemos su valor
    expect(component['searchQuery']()).toBe('');
    // Test de funcionalidad, comprobamos que el span se actualiza con el valor esperado
    const buttonDebug = fixture.debugElement.query(By.css('button'));
    const button = buttonDebug.nativeElement as HTMLButtonElement;
    buttonDebug.triggerEventHandler('click', {target: button})
    const spanDebug = fixture.debugElement.query(By.css('span'));
    const span = spanDebug.nativeElement as HTMLSpanElement;
    expect(span.textContent).toBe('Esperando');
  });
});
