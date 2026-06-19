import { Component, input, output } from '@angular/core';

@Component({
  selector: 'ind-check',
  imports: [],
  template: `
  <label>
    <input type="checkbox" [checked]="checked()" (change)="toggleChecked()" />
    <span>{{ label() }}</span>
  </label>

  `,
  styles: `

  `,
})
export class Check {
  readonly label = input.required<string>();
  // Variable para indicar si el componente esta checked
  readonly checked = input<boolean>(false);
  readonly emitCheckedChange = output<boolean>();

  toggleChecked() {
    const finalChecked = !this.checked();
    this.emitCheckedChange.emit(finalChecked);
    console.log(`Checked: ${finalChecked}`);
  }
}
