import { Component, input, model, output } from '@angular/core';

@Component({
  selector: 'ind-check',
  imports: [],
  template: `
    <label class="custom-checkbox">
      <input type="checkbox" [checked]="checked()" (change)="toggle()" />
      <span class="check-mark"></span>
      <span class="label-text">{{ label() }}</span>
    </label>
  `,
  styles: `
    .custom-checkbox {
      display: flex;
      align-items: center;
      gap: 8px;
      margin: 12px 0;
      cursor: pointer;
      user-select: none;

      input[type='checkbox'] {
        margin: 0;
        opacity: 0;
      }
    }

    .check-mark {
      width: 18px;
      height: 18px;
      border: 2px solid #ddd;
      border-radius: 3px;
      display: inline-block;
      position: relative;
    }

    .custom-checkbox input[type='checkbox']:checked + .check-mark {
      background-color: var(--color-secondary);
      border-color: var(--color-tertiary-hot);
    }

    .custom-checkbox input[type='checkbox']:checked + .check-mark::after {
      content: '✓';
      position: absolute;
      color: var(--color-background);
      font-size: 14px;
      top: -2px;
      left: 2px;
    }
  `,
})
export class Check {
  readonly label = input.required<string>();

  readonly checked = model.required<boolean>();

  // readonly checked = input.required<boolean>(false);
  readonly emitCheckedChange = output<boolean>();

  toggle() {
    const finalCheckedState = !this.checked();
    // this.emitCheckedChange.emit(finalCheckedState);
    this.checked.set(finalCheckedState);
  }
}
