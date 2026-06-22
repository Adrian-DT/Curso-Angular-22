import { Component, signal } from '@angular/core';
import { UserRegister } from './types/register';
import { form, FormField, FormRoot, required } from '@angular/forms/signals';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'ind-register-page',
  imports: [FormField, FormRoot, JsonPipe],
  template: `
    <form [formRoot]="reRegisterForm" (ngSubmit)="submitForm()">
      <label for="email" class="form-group"
        >Email Email
        <input type="email" [formField]="reRegisterForm.email" />
      </label>

      @if (reRegisterForm.email()?.invalid() && reRegisterForm.email()?.touched()) {
        <div class="error">
          <p>Email is required.</p>
          <!-- @if (reRegisterForm.email().errors()[0]?.['required']) {
            <p>Email is required.</p>
          } @else if (reRegisterForm.email()?.hasError('email')) {
            <p>Please enter a valid email address.</p>
          } -->
        </div>
      }
      <label for="passwd" class="form-group">
        Password
        <input type="password" [formField]="reRegisterForm.password" />
      </label>
      <label for="firstName" class="form-group">
        First Name
        <input type="text" [formField]="reRegisterForm.firstName" />
      </label>
      <label for="surname" class="form-group">
        Surname
        <input type="text" [formField]="reRegisterForm.surname" />
      </label>
      <label for="isOk" class="form-group">
        <input type="checkbox" [formField]="reRegisterForm.isOk" />
        Accept Terms ...
      </label>
      <button type="submit" [disabled]="reRegisterForm().invalid()">Register</button>
    </form>
    <pre>{{ reRegisterForm().value() | json }}</pre>
  `,
  styles: `
    form {
      display: flex;
      flex-direction: column;
      gap: 1rem;
      margin-block: 1rem;
    }
    label {
      display: flex;
      flex-direction: row;
      gap: 0.5rem;
    }
    .error {
      color: red;
      font-size: 0.875rem;
    }
  `,
})
export class RegisterPage {
  #initialValues: UserRegister = {
    firstName: '',
    surname: '',
    email: '',
    password: '',
    isOk: false,
  };

  protected readonly user = signal<UserRegister>(this.#initialValues);
  protected readonly reRegisterForm = form(this.user, (schema) => {
    required(schema.email)
  });

  submitForm() {
    console.log('Form submitted:', this.reRegisterForm().value());
  }
}
