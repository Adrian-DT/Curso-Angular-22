import { Component, signal } from '@angular/core';
import { Check } from '../../../../core/components/check/check';

@Component({
  selector: 'ind-terms',
  imports: [Check],
  template: `
    <div class="demo-section">
      <p>Aceptas los términos y las notificaciones!</p>
      <ind-check
        [label]="labelTerms()"
        [checked]="isAcceptedTerms()"
        (checkedChange)="toggleAcceptedTerms($event)"
      />

      <p>
        <ind-check
          [label]="labelNotifications()"
          [checked]="isAcceptedNotifications()"
          (checkedChange)="toggleAcceptedNotifications($event)"
          //[(checked)]
        />

  <div class= "controls">
      <p>
        Terms agreed:
        @if (isAcceptedTerms()) {
          Yes
        } @else {
          No
        }
      </p>
      <p>
        Notifications agreed:
        @if (isAcceptedNotifications()) {
          Yes
        } @else {
          No
        }
      </p>

      <button (click)="toggleTerms()">Toggle Terms from Parent</button>
      <button (click)="resetAll()">Reset All</button>
      </div>
    </div>
  `,
  styles: `
    .shopping-app {
      max-width: 600px;
      margin: 0 auto;
      padding: 20px;
    }

    .demo-section {
      margin: 20px 0;
      padding: 20px;
      border: 1px solid #e0e0e0;
      border-radius: 8px;
      background: #fafafa;
    }

    .controls {
      margin: 20px 0;
      padding: 16px;
      background: #f0f8ff;
      border-radius: 8px;
      border-left: 4px solid var(--color-primary);
    }

    .controls p {
      margin: 8px 0;
      font-weight: bold;
    }

    button {
      margin-right: 8px;
      padding: 8px 16px;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      background: var(--color-primary);
      color: var(--color-background);
      font-weight: bold;
      transition: background-color 0.2s;
    }

    button:hover {
      background: var(--color-primary-hot);
    }`,
})
export class Terms {
  protected readonly labelTerms = signal('Acepto los términos y condiciones');
  
  protected readonly isAcceptedTerms = signal(false);
  
  protected toggleAcceptedTerms(checked: boolean) {
    this.isAcceptedTerms.set(checked);
  }

  protected readonly labelNotifications = signal('Acepto las notificaciones');
  
  protected readonly isAcceptedNotifications = signal(false);
 
  protected toggleAcceptedNotifications(checked: boolean) {
    this.isAcceptedNotifications.set(checked);
  }

  protected toggleTerms() {
    this.isAcceptedTerms.set(!this.isAcceptedTerms());
  }

  resetAll() {
    this.isAcceptedTerms.set(false);
    this.isAcceptedNotifications.set(false);
  }
}
