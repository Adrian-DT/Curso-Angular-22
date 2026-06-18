import { Component, signal } from '@angular/core';
import { Card } from "../home/components/card/card";
import { CounterList } from "./components/counter-list/counter-list";

@Component({
  selector: 'ind-dashboard-page',
  imports: [Card, CounterList],
  template: ` <h2>{{ title() }}</h2>
  <!-- Pasamos al input el objeto que espera para ser configurado, en este caso el string que mostrará mediante title, y el tipo de h2,h3,h4... en este caso indicamos que será un h3 -->
  <ind-card [title]="{title: 'Contador', level: 3}">
    <ind-counter-list/>
  </ind-card>
  `,
  styleUrls: ['../pages.css'],
  styles: ``,
})

  // Para facilitar el uso, las clases de la página se exportan por defecto
export default class DashboardPage {
  protected readonly title = signal('Dashboard');
}
