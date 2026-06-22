import { Component, signal } from '@angular/core';
import { Card } from "../../core/components/card/card";
import { CounterList } from './counter-list/counter-list';

@Component({
  selector: 'ind-dashboard-page',
  imports: [CounterList, Card],
  template: `
    <h2>{{ pageTitle() }}</h2>
    <ind-card>
      <ind-counter-list />
    </ind-card>

    `,
  styleUrls: ['../pages.css'],
  styles: ``,
})
export default class DashboardPage {
    protected readonly pageTitle = signal('Dashboard');
}
