import { Component } from '@angular/core';

@Component({
  selector: 'ind-counter-ns',
  imports: [],
  template: `
    <p>Value: <output> {{ value }}  </output></p>
    <div>
      <button (click)="changeValue(1)" title="Increment"> ➕</button>
      <button (click)="changeValue(-1)" title="Decrement"> ➖</button>
      <button (click)="changeValue(0)" title="Reset"> 🔄</button>
    </div>
  `,
  styles: ``,
})
export class CounterNS {
  // protected readonly initialValue = signal(0);
  protected value = 0;

  protected changeValue(delta: number) {
    if (delta === 0) {
      this.value = 0;
    } else {
      this.value += delta;
    }
  }
}
