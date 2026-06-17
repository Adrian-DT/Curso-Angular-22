import { Component, signal, ViewEncapsulation } from '@angular/core';

@Component({
  encapsulation: ViewEncapsulation.Emulated,
  selector: 'ind-footer',
  imports: [],
  template: `
  <footer>
    <address>
      <p>{{ autor() }}</p>
      <p>{{ brand() }}</p>
      <p>Fecha: {{ today().getFullYear() }}</p>
    </address>
    <ng-content select='ind-socials'/>
  </footer>
  `,
  styles: `
    :host {
      background-color: var(--color-background-primary);
      color: var(--color-primary-hot);
      display: flex;
      justify-content: center;
      align-items: center;
      border-top: 2px solid var(--color-primary);
      margin-top: 1rem;
      padding-block-start: 1rem;
      min-height: 12vh;
    }
    footer {
      text-align: center;
    }
    address {
      font-style: normal;
    }
  `,
})
export class Footer {
  protected readonly autor = signal('Adrián Delgado Tuñón');
  protected readonly brand = signal('ADT Dev');
  protected readonly today = signal(new Date());



}
