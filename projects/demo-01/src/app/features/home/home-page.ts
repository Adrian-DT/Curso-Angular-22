import { Component, signal } from '@angular/core';
import { Card } from './components/card/card';
import { Sample } from './components/sample/sample';

@Component({
  selector: 'ind-home-page',
  imports: [Sample, Card],
  template: ` <h2>{{ title() }}</h2>
    <ind-card>
      <!-- Para mostrar el contenido de ind-card, tenemos que poner en el template de card, el ng-content, si no, no muestra el contenido -->
      <ind-sample />
    </ind-card>
  `,
  styleUrls: ['../pages.css'],
  styles: ``,
})

// Para facilitar el uso, las clases de la página se exportan por defecto
export default class HomePage {
  protected readonly title = signal('Home');
}
