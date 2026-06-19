import { Component, input } from '@angular/core';
import { MenuMobile } from '../menu-mobile/menu-mobile';
import { Separator } from '../separator/separator';
import { Search } from "../search/search";
import { LogoCoders } from '../logo-coders/logo-coders';
import { Toggle } from '../toggle/toggle';
import { User } from '../user/user';

@Component({
  selector: 'ind-header',
  imports: [MenuMobile, Separator, Search, LogoCoders, Toggle, User],
  template: `
  <header>
      <div class="left-side">
        <ind-logo-coders />
      </div>
      <hgroup>
        <h1 class="title">{{ title() }}</h1>
      </hgroup>
      <div class="right-side">
        <div class="icons">
          <ind-user/>
          <ind-menu-mobile class="mobile-only" />
        </div>
        <ind-toggle />
      </div>
      <div class="bottom-row">
        <p>{{ subtitle() }}</p>
        <ind-search />
        <!-- <ind-search-ref/> -->
        <div class="desktop-only">
          <ng-content></ng-content>
        </div>
      </div>
    </header>
    <ind-separator />
  `,
  styles: `
      :host {
        margin-bottom: 1.5rem;
        min-height: 15vh;
        color: var(--color-primary-hot);
        background-color: var(--color-background-primary);
      }

      header {
        padding: 1rem 2rem;
        display: grid;
        grid-template-columns: minmax(auto, max-content) 1fr minmax(auto, max-content);
        justify-items: center;
        align-items: center;
        text-align: center;
      }

      .left-side {
        min-width: 5rem;
      }

      hgroup {
        max-width: 15rem;
        h1 {
          color: var(--color-primary);
          font-family: var(--font-family-heading);
          font-size: 3.125rem;
          font-weight: 500;
          line-height: 100%;
          letter-spacing: -0.125rem;
          margin: 0;
        }
      }

      .right-side {
        min-width: 5rem;
        display: flex;
        flex-direction: column;
        align-items: flex-end;
        gap: 0.5rem;

        .icons {
          display: flex;
          gap: 1rem;
        }
      }

      .bottom-row {
        grid-column: span 3;
        margin-top: 0.6rem;

        .desktop-only {
          display: none;
        }
      }

      @media (width > 800px) {
        hgroup {
          max-width: none;
        }

        ind-menu-mobile {
          display: none;
        }
        .bottom-row {
          .desktop-only {
            display: block;
            margin-top: 1rem;
          }
        }
      }
  `,
})
export class Header {
  // Indicamos que será un input de tipo string, recibiremos el valor del template de app, incorporando el valor en el componente
  // Si indicamos input.required, nos pedirá que se lo pasemos por el componente padre, en este caso app, si no lo hacemos, nos dará error en consola.
  // A los input le podemos pasar un objeto, indicando el alías para el componente padre
  public readonly title = input.required<string>({
    // eslint-disable-next-line @angular-eslint/no-input-rename
    alias: 'headerTitle',
  });
  // Indicamos que será un input de tipo string, recibiremos el valor del template de app, incorporando el valor en el componente
  public readonly subtitle = input<string>();


}
