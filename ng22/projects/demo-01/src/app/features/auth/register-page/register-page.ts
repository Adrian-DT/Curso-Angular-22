import { Component, signal } from '@angular/core';
import { UserRegister } from '../types/register';
import { form, FormField, FormRoot, required } from '@angular/forms/signals';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'ind-register-page',
  imports: [FormField, FormRoot, JsonPipe],
  template: `
    <h1>Register Page</h1>
    <p>
      Bienvenido a la página de registro. Por favor, introduce tus credenciales para crear una
      cuenta.
    </p>
    <form [formRoot]="registerForm" (ngSubmit)="submitForm()">
      <label for="username">Email:</label>
      <input type="text" id="email" [formField]="registerForm.username" />
      <!-- Mostramos un mensaje de error si el campo de usuario está vacío y el formulario ha sido tocado. -->
      @if (registerForm.email().invalid() && registerForm.email().touched()) {
        <div>
          <span>
            El nombre de usuario es obligatorio.
            <!-- {{ registerForm.email().errors()[0].message }} -->
          </span>
        </div>
      }

      <label for="password">Contraseña:</label>
      <input type="password" id="password" [formField]="registerForm.password" />
      <!-- Mostramos un mensaje de error si el campo de contraseña tiene menos de 6 caracteres y el formulario ha sido tocado. -->
      @if (registerForm.password().invalid() && registerForm.password().touched()) {
        <div>
          <span>
            La contraseña debe tener al menos 6 caracteres.
            <!-- {{ registerForm.password().errors()[0].message }} -->
          </span>
        </div>
      }

      <label for="terms">Aceptas los términos y condiciones</label>
      <input type="checkbox" id="terms" formControlName="terms" required />
      <!-- Mientras el formulario sea invalido, estará deshabilitado el boton de enviar. El formulario es invalido si el campo de usuario está vacío o si la contraseña tiene menos de 6 caracteres. -->
      <button type="submit" [disabled]="registerForm().invalid()">Registrarse</button>
    </form>

    <pre> {{ registerForm | json }} </pre>

    <!-- <p>
      Si no tienes cuenta puedes registrarte en el
      <a [routerLink]="['/users', 'register']">registro</a>
    </p> -->
  `,
  styles: ``,
})
export default class RegisterPage {
  #initialValues: UserRegister = {
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    isOk: false,
  };

  protected readonly userRegister = signal<UserRegister>(this.#initialValues);

  protected readonly registerForm2 = form(this.userRegister);
  protected readonly registerForm = form(this.userRegister, (schema) => {
    required(schema.email);
    required(schema.password);
  });

  protected submitForm() {
    console.log(this.registerForm().value());
  }
}
