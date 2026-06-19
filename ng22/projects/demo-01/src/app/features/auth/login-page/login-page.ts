import { JsonPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'ind-login-page',
  imports: [RouterLink, ReactiveFormsModule, JsonPipe],
  template: `
  <h1>Login Page</h1>
  <p>Bienvenido a la página de login. Por favor, introduce tus credenciales para acceder a tu cuenta.</p>
  <form [formGroup]="loginForm" (ngSubmit)="onSubmit()">
    <label for="username">Usuario:</label>
    <input type="text" id="username" formControlName="username" required>

    <label for="password">Contraseña:</label>
    <input type="password" id="password" formControlName="password" required>

    <button type="submit">Iniciar sesión</button>
  </form>

  <pre> {{ loginForm.value | json }} </pre>

<p>Si no tienes cuenta puedes registrarte en el <a [routerLink]="['/users', 'register']">registro</a></p>

  `,
  styles: ``,
})
export default class LoginPage {

  // Inyectamos el servicio FormBuilder para crear un formulario reactivo, que nos permite manejar el estado del formulario y sus validaciones de manera más sencilla y eficiente.
  private formBuilder = inject(FormBuilder);

  // Creamos un formulario reactivo con FormBuilder, que nos permite manejar el estado del formulario y sus validaciones de manera más sencilla y eficiente.
  protected readonly loginForm: FormGroup = this.formBuilder.group({
    username: [''],
    password: [''],
  });

  protected onSubmit(): void {
    if (this.loginForm.valid) {
      // Aquí puedes manejar el envío del formulario, por ejemplo, llamando a un servicio de autenticación.
      console.log(this.loginForm.value);
    }
  }
}
