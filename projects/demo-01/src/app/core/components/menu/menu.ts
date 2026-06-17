import { Component, signal } from '@angular/core';
import { MENU_OPTIONS } from '../../../app.routes';
import { MenuOption } from '../../types/menu-option';

@Component({
  selector: 'ind-menu',
  imports: [],
  template: `
  <nav class="menu">
    <ul>
      @for (option of options(); track option.label) {
        <li>
          <a [href]="option.path">{{ option.label }}</a>
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
    }`,
})
export class Menu {

  // Propiedad para coger las rutas disponibles de la constante del app.routes
  protected readonly options = signal<MenuOption[]>(MENU_OPTIONS);


}
