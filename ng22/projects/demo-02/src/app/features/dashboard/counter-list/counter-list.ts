import { Component, inject, signal } from '@angular/core';
import { Card } from '../../../core/components/card/card';
import { Counter } from '../counter/counter';
import { Time, TimeOld } from '../../../core/services/time';

@Component({
  selector: 'ind-counter-list',
  imports: [Card, Counter],
  template: `
    <p>Valor total: {{ totalValue() }}</p>
    <p>Total de clicks : {{ totalClicks() }}</p>
    <div>
      <ind-card [title]="title()">
        <ind-counter [id]="110" (countEvent)="counterChange($event)"
        (resetEvent)="counterReset($event)" />
      </ind-card>
      <ind-card  [title]="title()">
        <ind-counter [id]="125" (countEvent)="counterChange($event)"
        (resetEvent)="counterReset($event)" />
      </ind-card>
    </div>
  `,
  styles: `
    div {
      display: flex;
      gap: 1rem;
    }
  `,
})
export class CounterList {
  protected readonly title = signal({ title: 'Contador', level: 3 as const });
  protected readonly totalValue = signal(0);
  protected readonly totalClicks = signal(0);

  private readonly ts = inject(Time);
   private readonly tso = inject(TimeOld);

  constructor() {
    console.log('CounterList constructor:', this.ts.getTime());
    console.log('CounterList constructor (old):', this.tso.getTime());
  }

  protected counterChange(delta: number) {
    this.totalValue.update((current) => current + delta);
    this.totalClicks.update((current) => current + 1);
  }

  protected counterReset(value: number) {
    this.totalValue.update((current) => current - value);
    this.totalClicks.update((current) => current + 1);
  }
}
