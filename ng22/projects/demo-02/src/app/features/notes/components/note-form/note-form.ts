import { Component, output } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Note } from '../../model/note';

@Component({
  selector: 'ind-note-form',
  imports: [FormsModule],
  template: `
    <form #ngForm="ngForm" (ngSubmit)="submitForm(ngForm)">
      <label class="form-control">
        <span>Título</span>
        <input type="text" name="title" ngModel required minlength="3" />
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
      <label class="form-control">
        <span>Contenido</span>
        <textarea name="content" ngModel></textarea>
      </label>
      <label class="form-control">
        <span>Autor</span>
        <input type="text" name="author" ngModel />
      </label>
      <label class="form-control">
        <span>Importante</span>
        <input class="form-check-input" type="checkbox" name="isImportant" ngModel />
      </label>
      <button type="submit" class="btn" [disabled]="ngForm.invalid">Añadir nota</button>
    </form>

    <!-- <pre>{{ ngForm.value | json }}</pre> -->
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
    }
  `,
})
export class NoteForm {
  protected readonly addEvent = output<Omit<Note, 'id'>>();
  submitForm(ngForm: NgForm) {
    console.log('ngForm', ngForm);
    if (ngForm.valid) {
      this.addEvent.emit(ngForm.value);
      ngForm.resetForm();
    }
  }
}
