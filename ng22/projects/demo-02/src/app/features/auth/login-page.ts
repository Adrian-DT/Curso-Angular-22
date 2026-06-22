import { JsonPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'ind-login-page',
  imports: [RouterLink, ReactiveFormsModule, JsonPipe],
  template: `
    <h1>Login</h1>
    <form [formGroup]="loginForm" (ngSubmit)="onSubmit()">
      <label for="username"
        >Username:
        <input type="text" id="username" formControlName="username" />
      </label>

      @if (loginForm.controls['username']?.invalid && loginForm.controls['username']?.touched) {
        <div class="error">
          @if (loginForm.controls['username']?.errors?.['required']) {
            <p>El nombre de usuario es obligatorio</p>
          }
        </div>
      }
      <label for="password">
        Password:
        <input type="password" id="password" formControlName="password" />
      </label>
      @if (loginForm.controls['password']?.invalid && loginForm.controls['password']?.touched) {
        <div class="error">
          @if (loginForm.controls['password']?.errors?.['required']) {
            <p>La contraseña es obligatoria</p>
          } @else if (loginForm.controls['password']?.errors?.['minlength']) {
            <p>La contraseña debe tener al menos 6 caracteres</p>
          }
        </div>
      }
      <button type="submit" [disabled]="loginForm.invalid">Login</button>
    </form>

    <pre>{{ loginForm.value | json }}</pre>
    <p>
      ¿Olvidaste tu contraseña? Puedes recuperarla en el
      <a [routerLink]="['/user', 'recover']">recuperar contraseña</a>
    </p>
    <p>
      Si no tienes cuenta, puedes registrarte en el
      <a [routerLink]="['/user', 'register']">registro</a>
    </p>
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
export class LoginPage {
  private fb = inject(FormBuilder);

  // formGroup
  // new FormGroup({
  //   username: new FormControl('', [Validators.required]),
  //   password: new FormControl('', [Validators.required]),
  // });

  protected loginForm: FormGroup = this.fb.group({
    username: ['', [Validators.required]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });

  onSubmit() {
    console.log('Form submitted:', this.loginForm.value);
  }
}
