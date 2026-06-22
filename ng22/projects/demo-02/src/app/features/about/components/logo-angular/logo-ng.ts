import { Component } from '@angular/core';

@Component({
  selector: 'ind-logo-ng',
  imports: [],
  templateUrl: './logo-ng.svg',
  styles: `
    :host {
      display: block;
      max-width: 9.2rem;
      margin: 0 auto;
    }
  `,
})
export class LogoNg {}
