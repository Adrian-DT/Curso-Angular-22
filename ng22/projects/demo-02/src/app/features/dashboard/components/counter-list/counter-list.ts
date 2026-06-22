import { Component, inject, signal } from '@angular/core';
import { Card } from '../../../home/components/card/card';
import { Counter } from '../counter/counter';
import { Time } from '../../../../core/services/time';

@Component({
  selector: 'ind-counter-list',
  imports: [Card, Counter],
  // Podemos proveer un servicio a nivel de componente, para que sea inyectado en todos los componentes hijos, y así poder compartir el mismo servicio entre ellos.
  // Esto es útil cuando queremos compartir un servicio entre varios componentes, pero no queremos que sea global,
  // sino que solo sea compartido entre los componentes que lo necesitan. Esto genera una instancia del servicio para cada vez que se genera el componente en vista.
  providers: [Time],
  template: `
    <p>Valor total: {{ totalValue() }}</p>
    <p>Clicks total: {{ totalClicks() }}</p>
    <div>
      <ind-card [title]="title()">
        <ind-counter
          [id]="1"
          (countEvent)="counterChange($event)"
          (resetEvent)="counterReset($event)"
        />
      </ind-card>

      <ind-card [title]="title()">
        <ind-counter
          [id]="2"
          (countEvent)="counterChange($event)"
          (resetEvent)="counterReset($event)"
        />
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

  private readonly timeService = inject(Time);

  constructor() {
    console.log('CounterList constructor: ', this.timeService.getTime());
  }

  counterChange($event: number) {
    this.totalValue.update((currentValue) => currentValue + $event);
    this.totalClicks.update((currentValue) => currentValue + 1);
  }

  protected counterReset($event: number) {
    this.totalValue.update((currentValue) => currentValue - $event);
    this.totalClicks.update((currentValue) => currentValue + 1);
  }
}
