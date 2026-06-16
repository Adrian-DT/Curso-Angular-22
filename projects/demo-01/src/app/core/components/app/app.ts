import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Sample } from "../sample/sample";

@Component({
  selector: 'ind-root',
  imports: [RouterOutlet, Sample],
  template: `
    <h1>Hello, {{ title() }}</h1>

    <router-outlet />
    <ind-sample />
  `,
  styles: [],
})
export class App {
  protected readonly title = signal('Demo 01');
}
