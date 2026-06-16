import { Component, signal } from '@angular/core';

@Component({
  selector: 'ind-sample',
  imports: [],
  template: `
  <img [src]="logo()" [alt]="descripcionLogo()" />
  <p>{{ title() }}</p>
  <p>{{ subtitle }}</p>
  <button (click)="changeTitle($event)">Cambiar título</button>

  `,
  styles: ``,
})
export class Sample {
  protected readonly title = signal('Componente Sample');
  // Ejemplo que fallaría por falta de reactividad, por no ser una signal, en el
  // timeout de más adelante no se refleja el cambio.
  protected subtitle = "Hola, Angular 22";

  protected readonly logo = signal('/favicon.ico');
  protected readonly descripcionLogo = signal('Logo de Angular');

  constructor() {

    setTimeout(() => {
      this.title.set('Sample modificado');
    }, 2000);

    setTimeout(() => {
      this.subtitle = "Hola, Angular 22 modificado";
      console.log(this.subtitle);
    }, 3000);
  }

  protected changeTitle(event: Event) {
    this.title.set('Sample modificado mediante el botón.');
    console.log(event);
  }


}
