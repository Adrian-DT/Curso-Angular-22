import { Component } from '@angular/core';

@Component({
  selector: 'ind-separator',
  imports: [],
  template: ` <div role="separator" aria-label="Divider" class="divider"></div> `,
  styles: `
    .divider {
      width: 100%;
      height: 3px;
      background: var(--red-to-pink-to-purple-horizontal-gradient);
      margin-block: 0rem;
    }`,
})
export class Separator {



}
