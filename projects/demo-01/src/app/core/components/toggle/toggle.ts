import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'ind-toggle',
  imports: [FormsModule],
  template: `
    <label for="theme-toggle" aria-label="Theme">
      <span [hidden]="!isChecked()">{{ leftLabel() }}</span>
      <input type="checkbox" id="theme-toggle" [(ngModel)]="isChecked" />
      <span [hidden]="isChecked()">{{ rightLabel() }}</span>
    </label>
  `,
  styles: `
    :host {
      /* Theming variables
        Text: --color-text
        Checked/UnChecked button background: --color-background
        Checked background --color-secondary
        Checked button border --color-primary:
      */

      /* UnChecked background */
      --color-accent:var(--gray-400);
      /* UnChecked button border */
      --color-tertiary: var(--gray-700);
      width: fit-content;
    }

    label {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      width: fit-content;
      color: var(--color-primary);
    }

    input[type='checkbox'] {
      position: relative;
      height: 1.5rem;
      width: 3rem;
      cursor: pointer;
      appearance: none;
      -webkit-appearance: none;
      border-radius: 9999px;
      background-color: var(--color-accent);
      transition: all 0.3s ease;

      &:checked {
        background-color: var(--color-accent);
      }

      &::before {
        position: absolute;
        content: '';
        left: calc(1.5rem - 1.6rem);
        top: calc(1.5rem - 1.6rem);
        display: block;
        height: 1.6rem;
        width: 1.6rem;
        cursor: pointer;
        border: 1px solid color-mix(in srgb, var(--color-tertiary) 52%, transparent);
        border-radius: 9999px;
        background-color: var(--color-background);
        box-shadow: 0 3px 10px color-mix(in srgb, var(--color-tertiary) 32%, transparent);
        transition: all 0.3s ease;
      }

      &:hover::before {
        box-shadow: 0 0 0px 8px color-mix(in srgb, var(--color-text) 15%, transparent);
      }

      &:checked:before {
        transform: translateX(100%);
        border-color: var(--color-primary);
      }

      &:checked:hover::before {
        box-shadow: 0 0 0px 8px color-mix(in srgb, var(--color-primary) 32%, transparent);
      }
    }
  `,
})
export class Toggle {
  protected readonly leftLabel = signal('Claro');
  protected readonly rightLabel = signal('Oscuro');
  protected readonly isChecked = signal(false);

  // constructor() {
  //   effect(() => {
  //     const theme = this.isChecked() ? 'dark' : 'light';
  //     document.documentElement.setAttribute('data-theme', theme);
  //   });
  // }
}
