import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Counter } from './counter';
import { By } from '@angular/platform-browser';

describe('Counter', () => {
  let component: Counter;
  let fixture: ComponentFixture<Counter>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Counter],
    }).compileComponents();

    fixture = TestBed.createComponent(Counter);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // Test para verificar que el valor incrementa correctamente al llamar changueValue y pasando por parametro un 1
  // Test de implementación de la funcion changeValue
  it('should increment value', () => {
    component.changeValue(1);
    expect(component['value']()).toBe(1);
  });

  // Función que comprueba que el valor del output aumenta cuando se pulsa el botón increment
  it('should increment value when clicked', () => {
    const buttonDebug = fixture.debugElement.query(By.css('button[title="Increment"]'));
    const output = fixture.debugElement.query(By.css('output'));
    buttonDebug.triggerEventHandler('click', null);
    fixture.detectChanges();
    expect(output.nativeElement.textContent.trim()).toBe('1');
  });

  // Función que comprueba que el valor del output disminuye cuando se pulsa el botón decrement
  it('should decrement value when clicked', () => {
    const buttonDebug = fixture.debugElement.query(By.css('button[title="Decrement"]'));
    const output = fixture.debugElement.query(By.css('output'));
    buttonDebug.triggerEventHandler('click', null);
    fixture.detectChanges();
    expect(output.nativeElement.textContent.trim()).toBe('-1');
  });

  // Función que comprueba que el valor del output resetea cuando se pulsa el botón reset
  it('should reset value when clicked', () => {
    // Implementación
    const initialValue = component['value']();
    component['changeValue'](1);
    expect(component['value']()).toBe(initialValue + 1);
    // Funcionalidad
    const buttonDebug = fixture.debugElement.query(By.css('button[title="Reset"]'));
    const outputDebug = fixture.debugElement.query(By.css('output'));
    buttonDebug.triggerEventHandler('click', null);
    fixture.detectChanges();
    expect(outputDebug.nativeElement.textContent.trim()).toBe('0');
  });

  it('should disable increment button and show limit message when value reaches limit', () => {
    // Implementación
    const limit = component['limit']();
    component['changeValue'](limit);
    fixture.detectChanges();
    // Funcionalidad
    const incrementButtonDebug = fixture.debugElement.query(By.css('button[title="Increment"]'));
    expect(incrementButtonDebug.nativeElement.disabled).toBe(true);
    const limitMessageDebug = fixture.debugElement.query(By.css('.limit-reached'));
    expect(limitMessageDebug.nativeElement.textContent.trim()).toBe(`Limit ${limit} reached!`);
  });

  it('should disable decrement button and show limit message when value reaches negative limit', () => {
    // Implementación
    const limit = component['limit']();
    component['changeValue'](-limit);
    fixture.detectChanges();
    // Funcionalidad
    const decrementButtonDebug = fixture.debugElement.query(By.css('button[title="Decrement"]'));
    expect(decrementButtonDebug.nativeElement.disabled).toBe(true);
    const limitMessageDebug = fixture.debugElement.query(By.css('.limit-reached'));
    expect(limitMessageDebug.nativeElement.textContent.trim()).toBe(`Limit -${limit} reached!`);
  });
});
