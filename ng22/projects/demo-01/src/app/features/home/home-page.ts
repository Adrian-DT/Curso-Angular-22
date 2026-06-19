import { Component, inject, signal } from '@angular/core';
import { Card } from './components/card/card';
import { Sample } from './components/sample/sample';
import { Terms } from "./terms/terms";
import { Info } from './components/info/info';
import { Time } from '../../core/services/time';

@Component({
  selector: 'ind-home-page',
  imports: [Sample, Card, Terms, Info],
  template: `
  <section class="page">

    <h2>{{ title() }}</h2>
    <ind-card>
      <!-- Para mostrar el contenido de ind-card, tenemos que poner en el template de card, el ng-content, si no, no muestra el contenido -->
      <ind-sample />
      <ind-card>
        <ind-terms />
      </ind-card>
      <ind-info />
    </ind-card>
    </section>
    `,
  styleUrls: ['../pages.css'],
  styles: ``,
})

// Para facilitar el uso, las clases de la página se exportan por defecto
export default class HomePage {
  protected readonly title = signal('Home');

  protected readonly timeService = inject(Time);

  constructor() {
    console.log('HomePage constructor: ', this.timeService.date);
  }

  // Manera antigua de injectar un servicio en Angular.
  // constructor(private readonly timeService: Time) {
  //   console.log('HomePage constructor: ', this.timeService.date);
  // }
}
