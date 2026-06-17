import { Component, signal } from '@angular/core';
import { Card } from "../../../home/components/card/card";
import { Counter } from "../counter/counter";

@Component({
  selector: 'ind-counter-list',
  imports: [Card, Counter],
  template: `
    <p>Valor total: {{ totalValue() }}</p>
    <p>Clicks total: {{ totalClicks() }}</p>
    <div>
      <ind-card [title]="title()">
        <ind-counter (countEvent)="counterChange($event)" />
      </ind-card>

      <ind-card [title]="title()">
        <ind-counter (countEvent)="counterChange($event)" />
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
  protected readonly title = signal({ title: 'Contador', level: 3 as const })
  protected readonly totalValue = signal(0);
  protected readonly totalClicks = signal(0);

  counterChange($event: number) {
    this.totalValue.update((currentValue) => currentValue + $event);
    this.totalClicks.update((currentValue) => currentValue + 1);
  }

}
