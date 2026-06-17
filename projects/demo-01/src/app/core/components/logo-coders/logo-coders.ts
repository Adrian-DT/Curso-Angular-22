import { Component } from '@angular/core';

@Component({
  selector: 'ind-logo-coders',
  imports: [],
  templateUrl: './logo-coders.svg',
  styles: `
    :host {
      display: block;
    }
  `,
})
export class LogoCoders {
  size = '5.5rem';
  upperColor = 'var(--color-primary)';
  downColor = 'var(--color-secondary)';

  handleClick(source: string) {
    console.log('LogoCoders clicked from:', source);
  }
}
