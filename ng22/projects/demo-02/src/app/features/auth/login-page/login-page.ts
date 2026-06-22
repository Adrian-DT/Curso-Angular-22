import { JsonPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'ind-login-page',
  imports: [RouterLink, ReactiveFormsModule, JsonPipe],
  template: `
    <h1>Login Page</h1>
    <p>
      Bienvenido a la página de login. Por favor, introduce tus credenciales para acceder a tu
      cuenta.
    </p>
    <form [formGroup]="loginForm" (ngSubmit)="onSubmit()">
      <label for="username">Usuario:</label>
      <input type="text" id="username" formControlName="username" required />
      <!-- Mostramos un mensaje de error si el campo de usuario está vacío y el formulario ha sido tocado. -->
      @if (loginForm.controls['username'].invalid && loginForm.controls['username'].touched) {
        <div>
          <span> El nombre de usuario es obligatorio. </span>
        </div>
      }

      <label for="password">Contraseña:</label>
      <input type="password" id="password" formControlName="password" required />
      <!-- Mostramos un mensaje de error si el campo de contraseña tiene menos de 6 caracteres y el formulario ha sido tocado. -->
      @if (loginForm.controls['password'].invalid && loginForm.controls['password'].touched) {
        <div>
          <span> La contraseña debe tener al menos 6 caracteres. </span>
        </div>
      }
      <!-- Mientras el formulario sea invalido, estará deshabilitado el boton de enviar. El formulario es invalido si el campo de usuario está vacío o si la contraseña tiene menos de 6 caracteres. -->
      <button type="submit" [disabled]="loginForm.invalid">Iniciar sesión</button>
    </form>

    <pre> {{ loginForm.value | json }} </pre>

    <p>
      Si no tienes cuenta puedes registrarte en el
      <a [routerLink]="['/users', 'register']">registro</a>
    </p>
  `,
  styles: `
    form {
      display: flex;
      flex-direction: column;
      max-width: 300px;
    }
  `,
})
export default class LoginPage {
  // Inyectamos el servicio FormBuilder para crear un formulario reactivo, que nos permite manejar el estado del formulario y sus validaciones de manera más sencilla y eficiente.
  private formBuilder = inject(FormBuilder);

  // Creamos un formulario reactivo con FormBuilder, que nos permite manejar el estado del formulario y sus validaciones de manera más sencilla y eficiente.
  protected readonly loginForm: FormGroup = this.formBuilder.group({
    // Definimos los controles del formulario y sus validaciones. El campo username es obligatorio, mientras que el campo password es obligatorio y debe tener al menos 6 caracteres.
    username: ['', Validators.required],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });

  protected onSubmit(): void {
    if (this.loginForm.valid) {
      // Aquí puedes manejar el envío del formulario, por ejemplo, llamando a un servicio de autenticación.
      console.log(this.loginForm.value);
    }
  }
}
