import { Component, output, signal } from '@angular/core';

const LIMIT = 5;

@Component({
  selector: 'ind-counter',
  imports: [],
  template: `

  @if (value() >= limit() || value() <= -limit()) {
    <p class="limited-reached">
      Has alcanzado el limite actual {{ value() }}.
    </p>
  } @else if (value() <= -limit()){
    <p class="limited-reached">
      Has alcanzado el limite actual {{ value() }}.
    </p>
  } @else {
    <p class="limited-reached">&nbsp;</p>
  }

  <!-- Aplicamos clases según condiciones, en este caso si el caso es negativo, aplicamos la calse negative. -->
    <p>Value:
      <!-- Caso evaluando ternario -->
      <output [class]="value() < 0 ? 'negative' : ''">{{ value() }}</output>
    </p>
    <p>Value:
      <!-- Caso evaluando la propiedad de un objeto, este caso es utilizado para múltiples condiciones a aplicar -->
      <output [class]="{negative: value() < 0 }">{{ value() }}</output>
    </p>
    <p>Value:
      <!-- Caso aplicando una clase en función de si se cumple una condición, caso más habitual para un único caso -->
      <output [class.negative]="value() < 0">{{ value() }}</output>
    </p>
    <div>
      <!-- Deshabilitamos los botones en función de si el valor es mayor al limite o inferio, y el reset en caso de ya estar en 0. -->
      <button (click)="changeValue(1)" title="Increment" [disabled]="value() >= limit()">➕</button>
      <button (click)="changeValue(-1)" title="Decrement" [disabled]="value() <= -limit()">➖</button>
      <button (click)="changeValue(0)" title="Reset" [disabled]="value() === 0">🔁</button>
    </div>
  `,
  styles: `
  :host{
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
  }

  .limited-reached,
    .negative {
      color: var(--color-tertiary-hot);
    }
  `,
})
export class Counter {
  protected readonly value = signal(0);
  protected readonly limit = signal(LIMIT);

  // Declaración de un evento de salida que emitirá un valor, gracias al decorador @Output,
  // esto nos permite hacer uso de el en el componente padre, en este caso CounterList
  // @Output() protected readonly countEvent = new EventEmitter<number>();
  // Manera simplificada de hacer algo similar a lo anterior, sin usar decorador
  protected readonly countEvent = output<number>();


  changeValue(value: number) {
    if (value === 0) {
      this.value.set(0);
    } else {
      this.value.update((currentValue) => currentValue + value);
      // this.value.set(this.value() + value);
    }
    this.countEvent.emit(value);
  }
}
