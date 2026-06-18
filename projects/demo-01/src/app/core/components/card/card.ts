import { Component, input } from '@angular/core';

// Equivalente a un Enum para especificar los valores disponibles de los titulos de las cards
interface CardConfig {
  title?: string;
  level: 2 | 3 | 4;
}

@Component({
  selector: 'ind-card',
  imports: [],
  template: `

  @switch (title()?.level) {
    @case (2) {
    <h2>{{ title()?.title }}</h2>
    }
    @case (3) {
      <h3>{{ title()?.title }}</h3>
    }
    @case (4) {
      <h4>{{ title()?.title }}</h4>
    }
    @default {

    }
  }
    <!-- Con ng-content le indicamos que si en algun template se le incorpora dentro contenido, lo muestre -->
    <ng-content/>


  <!-- Con la pseudoclase Host en styles, indicamos que son estilos del propio componente -->
  `,
  styles: `
    :host {
      display: block;
      margin: 1rem 0;
      padding: 1rem;
      border: 1px solid var(--gray-400);
      border-radius: 8px;
      box-shadow: 2px 2px 6px rgba(0, 0, 0, 0.1);
      text-align: center;
      width: fit-content;

      &.wide {
        max-width: 100%;
        width: 100%;
        margin: 1rem 0;
        display: flex;
        justify-content: center;
      }
    }
  `,
})
export class Card {

  public readonly title = input<CardConfig>();

}
