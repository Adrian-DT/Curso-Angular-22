import { Component, signal } from '@angular/core';
import { LogoNg } from "./components/logo-angular/logo-ng";
import { SeparatorRwd } from "./components/separator-rwd/separator-rwd";
import { Pills } from "./components/pills/pills";

@Component({
  selector: 'ind-about-page',
  imports: [LogoNg, SeparatorRwd, Pills],
  template: `
  <div>
      <ind-logo-ng />
      <h2>{{ title() }}</h2>
    </div>
    <ind-separator-rwd />
    <ind-pills />
  `,
  styleUrls: ['../pages.css'],
  styles: `
      :host {
      display: flex;
      flex-direction: column;
    }
    @media (width > 800px) {
      :host {
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        gap: 3rem;
      }
    }
  `,
})

  // Para facilitar el uso, las clases de la página se exportan por defecto
export default class AboutPage {
  protected readonly title = signal('About');
}
