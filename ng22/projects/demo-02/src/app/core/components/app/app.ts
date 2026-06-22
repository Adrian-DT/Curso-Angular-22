import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from '../header/header';
import { Footer } from '../footer/footer';
import { Socials } from '../socials/socials';
import { Menu } from '../menu/menu';
import { getRoutes} from '../../../app.routes';
import { MenuOption } from '../../types/menu-option';

@Component({
  selector: 'ind-root',
  imports: [RouterOutlet, Header, Footer, Socials, Menu],
  template: `
    <ind-header [headerTitle]="title()" [subtitle]="subtitle()">
      <ind-menu [options]="menuOptions()" />
    </ind-header>
    <main class="container">
      <router-outlet />

      <!-- Aquí cargara las páginas el Router -->
      <!-- 
      <ind-card class="wide">
        <ind-home-page id="home"/>
      </ind-card>

      <ind-card class="wide">
        <ind-dashboard-page id="dashboard" />
      </ind-card>

      <ind-card class="wide">
        <ind-about-page id="about" />
      </ind-card> -->
    </main>
    <ind-footer>
      <ind-socials class="socials" />
    </ind-footer>
  `,

  styles: `
    :host {
      display: grid;
      grid-template-rows: auto 1fr auto;
      min-height: 100vh;
      font-family: var(--font-family);
      margin: 0;
      padding: 0;
    }
    main.container {
      padding: 1rem 2rem;
      width: 100%;
      min-height: 90%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      padding: 1rem;
      position: relative;
    }
    @media (width > 600px) {
      .wide {
        align-self: stretch;
        margin-inline: 5rem;
      }
    }
  `,
})
export class App {
  protected readonly title = signal('Curso de Angular 22');
  protected readonly subtitle = signal('Aprende a desarrollar aplicaciones con Angular');
  protected readonly menuOptions = signal<MenuOption[]>(getRoutes());
}
