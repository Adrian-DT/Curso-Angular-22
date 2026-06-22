import { Component, inject, signal } from '@angular/core';
import { Card } from '../../core/components/card/card';
import { Sample } from './components/sample/sample';
import { Terms } from './components/terms/terms';
import { Info } from './components/info/info';
import { Time, TimeOld } from '../../core/services/time';

@Component({
  selector: 'ind-home-page',
  imports: [Sample, Terms, Card, Info],
  template: `
    <section class="page">
      <h2>{{ pageTitle() }}</h2>
      <ind-card>
        <ind-sample />
      </ind-card>
      <ind-card>
        <ind-terms />
      </ind-card>
      <ind-info />
    </section>
  `,
  styleUrls: ['../pages.css'],
  styles: `
    section {
      display: flex;
      flex-direction: column;
      align-items: center;
    }
  `,
})
export default class HomePage {
  protected readonly pageTitle = signal('Home');
  private readonly ts = inject(Time);
  private readonly tso = inject(TimeOld);

  // constructor(private readonly ts: Time) {
  constructor() {
    console.log('HomePage constructor:', this.ts.getTime());
    console.log('HomePage constructor (old):', this.tso.getTime());
  }
}
