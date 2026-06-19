import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from "../header/header";
import { Footer } from "../footer/footer";
import { Socials } from '../socials/socials';
import { Menu } from '../menu/menu';
import { MenuOption } from '../../types/menu-option';
import { getRoutes } from '../../../app.routes';

@Component({
  selector: 'ind-root',
  imports: [RouterOutlet, Header, Footer, Socials, Menu],
  template: `
  <ind-header [headerTitle]="title()" [subtitle]="subtitle()">
    <ind-menu  [options]="menuOptions()"/>
  </ind-header>
  <main class="container">
    <router-outlet />
    <!-- Debajo del router outlet es donde se cargarán las páginas desde las rutas, por lo que ya no es necesario indicar los componentes de las páginas manualmente -->
    <!-- <ind-card class="wide">
      <ind-home-page id="home" />
    </ind-card>
    <ind-card class="wide">
      <ind-dashboard-page id="dashboard"/>
    </ind-card>
    <ind-card class="wide">
      <ind-about-page id="about"/>
    </ind-card> -->

  </main>
  <ind-footer>
    <ind-socials />
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
  // Propiedades que pasaremos a los componentes para que lo reciban sus propiedades input y lo manejen en sus templates
  // Es buena practica que los componentes estén en la app para que se puedan reutilizar en otros proyectos, y que no tengan dependencias de la app, por eso pasamos los valores a los componentes mediante inputs.
  protected readonly title = signal('Curso de Angular 22');
  protected readonly subtitle = signal('Aprende a desarrollar aplicaciones web con Angular');

  protected readonly menuOptions = signal<MenuOption[]>(getRoutes());

  // Pruebas de cambio del titulo pasado al componente header con un timeout
  // constructor() {
  //   setTimeout(() => {
  //     this.title.set('Curso de Angular 22 - Actualizado')
  //   }, 5000);

  //   setTimeout(() => {
  //     this.subtitle.set('Aprende a desarrollar aplicaciones web con Angular - Actualizado')
  //   }, 7000);
  // }
}
