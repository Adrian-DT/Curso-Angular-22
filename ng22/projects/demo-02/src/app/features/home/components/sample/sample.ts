import { Component, signal } from '@angular/core';

@Component({
  selector: 'ind-sample',
  imports: [],
  template: `
    <img [src]="logo()" [alt]="description()" />
    <p>{{ title() }}</p>
    <p>{{ subtitle }}</p>
    <button (click)="changeTitle($event)">Cambiar título</button>
  `,
  styles: ``,
})
export class Sample {
  protected readonly title = signal<string>('Componente Sample');
  // Ejemplo que fallaría por falta de reactividad,
  // ya que no es un signal.
  // Se puede usar un signal para que sea reactivo.
  protected subtitle = 'Hola, Angular 22';

  protected readonly logo = signal<string>('/favicon.ico');
  protected readonly description = signal<string>('Logo de Angular');

  constructor() {
    setTimeout(() => {
      this.title.set('Sample modificado');
    }, 2000);
    setTimeout(() => {
      this.subtitle = 'Hola, Angular 22 modificado';
      console.log(this.subtitle);
    }, 3000);
  }

  protected changeTitle(event: Event) {
    this.title.set('Sample modificado por botón');
    console.log(event);
  }
}
