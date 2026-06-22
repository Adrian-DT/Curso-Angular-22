import { DatePipe, TitleCasePipe } from '@angular/common';
import { Component, signal, ViewEncapsulation } from '@angular/core';
import { Stick } from '../../directives/stick';

@Component({
  encapsulation: ViewEncapsulation.Emulated,
  selector: 'ind-footer',
  imports: [DatePipe, TitleCasePipe, Stick],
  template: `
    <footer>
      <address>
        <p indStick="pink">{{ autor() }}</p>
        <p indStick>{{ brand() }} © {{ today().getFullYear() }}</p>
      </address>
      <p>{{ today() | date : 'fullDate' | titlecase }}</p>
      <ng-content select='ind-socials' />
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
  protected readonly autor = signal('Alejandro Cerezo');
  protected readonly brand = signal('ICONO Training for Indra');
  protected readonly today = signal(new Date());
}
