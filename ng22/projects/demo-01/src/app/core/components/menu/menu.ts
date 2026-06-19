import { Component, input } from '@angular/core';
import { MenuOption } from '../../types/menu-option';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'ind-menu',
  imports: [RouterLink, RouterLinkActive],
  template: `
  <nav class="menu">
    <ul>
      @for (option of options(); track option.label) {
        <li>
          <!-- Para utilizar los principios de SPA, necesitamos usar el routerLink de Angular, que nos permite navegar entre las rutas definidas en la aplicación sin recargar la página completa. Esto es fundamental para mantener el estado de la aplicación y mejorar la experiencia del usuario. -->
          <a [routerLink]="option.path" [routerLinkActive]="'active'" >{{ option.label }}</a>
        </li>
      }
    </ul>
  </nav>


  `,
  styles: `
      nav {
      ul {
        list-style: none;
        margin: 0;
        padding: 0;
        display: flex;
        gap: 1rem;
      }

      a {
        color: inherit;
        text-decoration: none;
        font-weight: bold;
      }
    }

    .active {
      border-bottom: 2px solid var(--color-primary);
      display: inline-block;
      transform: scale(1.1);
      transition: all 0.3s ease-in-out;
    }
    `,
})
export class Menu {

  // Propiedad para coger las rutas disponibles de la constante del app.routes
  public readonly options = input.required<MenuOption[]>();


}
