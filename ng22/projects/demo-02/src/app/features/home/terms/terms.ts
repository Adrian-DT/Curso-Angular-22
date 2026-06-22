import { Component, signal } from '@angular/core';
import { Check } from '../../../core/components/check/check';

@Component({
  selector: 'ind-terms',
  imports: [Check],
  template: `
    <div class="demo-section">
      <p>Aceptas los términos y condiciones</p>
      <ind-check
        [label]="labelTerms()"
        [checked]="isAceptedTerms()"
        (emitCheckedChange)="toggleAceptedTerms($event)"
      />

      <p>
        @if (isAceptedTerms()) {
          Yes
        } @else {
          No
        }
      </p>
    </div>

    <div>
      <ind-check
        [label]="labelNotifications()"
        [checked]="isAceptedNotifications()"
        (emitCheckedChange)="toggleAceptedNotifications($event)"
      />
      <p>
        @if (isAceptedNotifications()) {
          Yes
        } @else {
          No
        }
      </p>
    </div>

    <div>
      <button (click)="toggleAceptedTerms(!isAceptedTerms())">Toggle Terms</button>
      <button (click)="toggleRemove()">Cancelar Ambas</button>
    </div>
  `,
  styles: ``,
})
export class Terms {
  protected readonly labelTerms = signal('Aceptas los términos');
  protected readonly labelNotifications = signal('Aceptas las notificaciones');
  protected readonly isAceptedTerms = signal(false);

  protected readonly isAceptedNotifications = signal(false);
  protected toggleAceptedTerms(checked: boolean) {
    this.isAceptedTerms.set(checked);
  }

  protected toggleAceptedNotifications(checked: boolean) {
    this.isAceptedNotifications.set(checked);
  }

  protected toggleRemove() {
    this.isAceptedTerms.set(false);
    this.isAceptedNotifications.set(false);
  }
}
