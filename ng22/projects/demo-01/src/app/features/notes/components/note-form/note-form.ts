import { JsonPipe } from '@angular/common';
import { Component, output } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Note } from '../../model/note';

@Component({
  selector: 'ind-note-form',
  // El módulo FormsModule tiene una directiva que contiene el eventPereventDefault, que evita que el formulario se envíe y recargue la página al hacer submit.
  imports: [FormsModule, JsonPipe],
  template: `
  <form #ngForm="ngForm" (ngSubmit)="ngForm.form.valid && submitForm(ngForm)">
    <label class="form-control" for="title">
      <span>Título:</span>
      <!-- Necesitamos poner la directiva ngModel para que Angular maneje el estado del formulario y podamos acceder a los valores de los campos. -->
      <input type="text" name="title" id="title" ngModel />
    </label>
      @if (ngForm.controls['title']?.invalid && ngForm.controls['title']?.touched) {
        <div class="error">
          @if (ngForm.controls['title']?.errors?.['required']) {
            <p>El título es obligatorio</p>
          } @else if (ngForm.controls['title']?.errors?.['minlength']) {
            <p>El título debe tener al menos 3 caracteres</p>
          }
        </div>
      }
    <label class="form-control" for="content">
      <span>Contenido:</span>
      <textarea name="content" id="content" ngModel required></textarea>
    </label>
    <label class="form-control" for="author">
      <span>Autor:</span>
      <input type="text" name="author" id="author" ngModel />
    </label>
    <label class="form-control" for="isImportant">
      <span>¿Es importante?</span>
      <input type="checkbox" name="isImportant" id="isImportant" ngModel />
    </label>
    <!-- Con [disabled]="!ngForm.form.valid" deshabilitamos el botón de submit si el formulario no es válido, es decir, si algún campo requerido está vacío o no cumple con las validaciones. -->
    <button type="submit" [disabled]="!ngForm.form.valid">Añadir</button>
  </form>
  <!-- Tenemos los valores del formulario en el objeto ngForm.value, que es un objeto con las propiedades title, content, author e isImportant.
  Podemos acceder a ellos y mostrarlos en un preformateado para verlos en tiempo real. -->
  <pre> {{ ngForm.value | json }} </pre>

  `,
  styles: `
  form {
      display: flex;
      flex-direction: column;
      gap: 1rem;
      margin-block: 1rem;
    }
    .form-control {
      display: flex;
      flex-direction: row;
      align-items: center;
      gap: 0.5rem;

      :nth-child(1) {
        flex: 0 0 100px;
      }

      :nth-child(2) {
        flex: 1 1 auto;
      }
    }
    .error {
      color: red;
      font-size: 0.8rem;
    }`,
})
export class NoteForm {
  // Evento para añadir una nota a la lista de notas, que se propaga desde el componente hijo (NoteForm) hacia el componente padre (NotesList).
  // Con Omit<Note, 'id'> indicamos que el evento emitirá un objeto Note sin la propiedad id, ya que el id se generará automáticamente en el componente padre.
  protected readonly addEvent = output<Omit<Note, 'id'>>();

  submitForm(ngForm: NgForm['value']) {
    // Mostramos en consola los valores del formulario para verificar que se están enviando correctamente.
    console.log('Evento emitido con los valores del formulario:', ngForm);

    // Validamos que el formulario sea válido antes de emitir el evento, para evitar enviar datos incompletos o incorrectos.
    if (ngForm.valid) {
      // Emitimos el evento con los valores del formulario, que se propaga hacia el componente padre (NotesList) para añadir la nota correspondiente.
      this.addEvent.emit(ngForm.value);
      // Reseteamos el formulario después de enviar los datos, para que los campos queden vacíos y podamos añadir otra nota.
      ngForm.resetForm();
    }
  }

}
