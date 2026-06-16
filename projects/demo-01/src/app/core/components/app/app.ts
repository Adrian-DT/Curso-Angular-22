import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Sample } from "../sample/sample";
import { Card } from '../card/card';

@Component({
  selector: 'ind-root',
  imports: [RouterOutlet, Sample, Card],
  template: `
  <header>
    <h1>Hello, {{ title() }}</h1>

  </header>
  <main>
    <router-outlet />
    <ind-card>
      <!-- Para mostrar el contenido de ind-card, tenemos que poner en el template de card, el ng-content, si no, no muestra el contenido -->
      <ind-sample />
    </ind-card>
  </main>

  `,
  styles: [],
})
export class App {
  protected readonly title = signal('Demo 01');
}
