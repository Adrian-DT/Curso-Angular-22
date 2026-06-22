import { Component, input } from '@angular/core';
import { MenuMobile } from '../menu-mobile/menu-mobile';
import { Separator } from '../separator/separator';
import { LogoCoders } from '../logo-coders/logo-coders';
import { Search } from '../search/search';
import { User } from '../user/user';
import { Toggle } from '../toggle/toggle';
import { SearchRef } from '../search/search.ref';

@Component({
  selector: 'ind-header',
  imports: [MenuMobile, Separator, LogoCoders, Search, SearchRef, User, Toggle],
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
          <ind-menu-mobile class="mobile-only" />
          <ind-user />
        </div>
        <ind-toggle />
      </div>
      <div class="bottom-row">
        <p>{{ subtitle() }}</p>
        <ind-search class="mobile-only" />
        <div class="desktop-only">
          <ng-content></ng-content>
          <ind-search-ref />
        </div>
      </div>
    </header>
    <ind-separator />
  `,
  styles: [
    `
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
          font-optical-sizing: auto;
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
        display: flex;
        flex-direction: column;
        gap: 0.5rem;

        .desktop-only {
          display: none;
        }
      }


    `,
    `
      /*
        @media screen and (min-width: 900px) {
        */
      @media (width > 800px) {
        hgroup {
          max-width: none;
        }

        ind-menu-mobile,
        .mobile-only {
          display: none;
        }
        .bottom-row {
          width: 100%;
          display: block;
          .desktop-only {
            display: flex;
            justify-content: space-between;
            align-items: center;
            gap: 1rem;
            margin-top: 1rem;
          }
        }
      }
    `,
  ],
})
export class Header {
  readonly title = input.required<string>({
    // eslint-disable-next-line @angular-eslint/no-input-rename
    alias: 'headerTitle',
  });
  readonly subtitle = input<string>();

}
