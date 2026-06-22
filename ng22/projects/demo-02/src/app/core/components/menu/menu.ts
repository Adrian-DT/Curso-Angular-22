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
            <a [routerLink]="option.path" [routerLinkActive]="'active'">{{ option.label }}</a>
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
      color: var(--color-primary-hot);
      border-bottom: 2px solid var(--color-primary-hot);
      display: inline-block;
      transform: scale(1.1);
      transition: all 0.3s ease-in-out;
    }
  `,
})
export class Menu {
  readonly options = input.required<MenuOption[]>();
}
