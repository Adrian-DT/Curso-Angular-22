import { DatePipe, TitleCasePipe } from '@angular/common';
import { Component, signal, ViewEncapsulation } from '@angular/core';
import { Stick } from "../../directives/stick";

@Component({
  encapsulation: ViewEncapsulation.Emulated,
  selector: 'ind-footer',
  imports: [DatePipe, TitleCasePipe, Stick],
  template: `
  <footer>
    <address>
      <!-- Aplicamos la directiva creada por nosotros inStick -->
      <p indStick="lightblue">{{ autor() }}</p>
      <p>{{ brand() }}</p>
      <p indStick>Fecha: {{ today().getFullYear() }}</p>
    </address>
    <p>
      <!-- Utilizamos el pipe date para mostrar la fecha en español, con el formato fullDate, y con la zona horaria UTC, para que no nos afecte la zona horaria del navegador. Esto es necesario porque por defecto Angular utiliza el locale inglés, y si queremos mostrar la fecha en español, debemos importarlo y pasarlo al PipeDate. -->
      <!-- {{ today() | date: 'fullDate' : 'UTC' : 'es-ES' }}
      Como hemos especificado en app.config, en el provider LOCALE_ID, que el locale por defecto es español, no es necesario pasarle el locale al pipe date. -->
      {{ today() | date: 'fullDate' | titlecase }}
    </p>
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
