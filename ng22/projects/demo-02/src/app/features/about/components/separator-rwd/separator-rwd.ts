import { Component } from '@angular/core';

@Component({
  selector: 'ind-separator-rwd',
  imports: [],
  template: ` <div role="separator" aria-label="Divider" class="divider"></div> `,
  styles: `
    .divider {
      width: 100%;
      height: 1.5px;
      background: var(--red-to-pink-to-purple-horizontal-gradient);
      margin-block: 1rem;
    }

    @media (width > 800px) {
      :host {
       align-self: stretch;
      }
      .divider {
        width: 1.5px;
        height: 90%;
        background: var(--red-to-pink-to-purple-vertical-gradient);
      }
    }
  `,
})
export class SeparatorRwd {}
