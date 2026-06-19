import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Card } from '../../../../core/components/card/card';
import { ValidRoleDirective } from '../../../../core/directives/valid-role.directive';

@Component({
    selector: 'ind-info',
    imports: [FormsModule, Card, ValidRoleDirective],
    template: `
    <ind-card>
      <p>
        Uso de la directiva estructural <code>indValidRole</code> que muestra o
        no un elemento en función de si el usuario tiene un rol válido.
      </p>
      <div><input type="checkbox" [(ngModel)]="isAdmin" /> Admin</div>
      <div *indValidRole="isAdmin">
        <h2>Información sensible</h2>
        <p>Esta información solo es visible para los administradores</p>
      </div>
      <ng-template [indValidRole]="isAdmin">
        <p>Más información para los administradores en un template</p>
      </ng-template>
    </ind-card>
  `,
    styles: `
    :host {
      display: flex;
    }
    code {
      background-color: #f4f4f4;
      padding: 0.2em 0.4em;
      border-radius: 3px;
      color: #c7254e;
      font-weight: 700;
    }
  `
})
export class Info {
  isAdmin = true;
}
