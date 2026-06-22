import { Component, computed, input, output, signal } from '@angular/core';

const LIMIT = 5;

@Component({
  selector: 'ind-counter',
  imports: [],
  template: `
    @if (id()) {
      <p>ID: {{ id() }}</p>
    }

    <p>
      <!-- Value: <output [class]="value() < 0 ? 'negative' : ''"> {{ value() }} </output>
      -->
      <!-- Value: <output [class]="{ negative: value() < 0 }"> {{ value() }} </output> -->
      Value: <output [class.negative]="value() < 0"> {{ value() }} </output>
    </p>

    @if (limitReached()) {
      <p class="limit-reached">Limit {{ limitReached() }} reached!</p>
    } @else {
      <p class="limit-reached">&nbsp;</p>
    }

    <div>
      <button (click)="changeValue()" [disabled]="value() >= limit()" title="Increment">➕</button>
      <button (click)="changeValue(-1)" [disabled]="value() <= -limit()" title="Decrement">
        ➖
      </button>
      <button (click)="changeValue(0)" [disabled]="value() === 0" title="Reset">🔄</button>
    </div>
  `,
  styles: `
    :host {
      display: flex;
      flex-direction: column;
      justify-content: center;
      gap: 0.5rem;
      margin-top: 0.5rem;
    }

    .limit-reached,
    .negative {
      color: var(--color-tertiary-hot);
    }
  `,
})
export class Counter {
  readonly id = input<number>();

  // En versiones anteriores @Output()
  protected readonly countEvent = output<number>();
  protected readonly resetEvent = output<number>();

  protected readonly value = signal(0);
  protected readonly limit = signal(LIMIT);

  protected readonly limitReached = computed(() => {
    if (this.value() >= this.limit()) {
      return 5;
    } else if (this.value() <= -this.limit()) {
      return -5;
    }
    return null;
  });

  // new EventEmitter<number>();

  protected changeValue(delta = 1) {
    if (delta === 0) {
      this.resetEvent.emit(this.value());
      this.value.set(0);
    } else {
      this.value.update((current) => current + delta);
      // this.value.set(this.value() + delta);
      this.countEvent.emit(delta);
    }
  }
}
