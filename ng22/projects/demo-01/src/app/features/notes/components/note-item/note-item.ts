import { Component, input, output, signal } from '@angular/core';
import { Note } from '../../model/note';
import { Card } from "../../../home/components/card/card";

@Component({
  selector: 'ind-note-item',
  imports: [Card],
  template: `
    <ind-card>
      <h3>{{ note().title }}</h3>
      <p>Author: {{ note().author }}</p>
      <label> <input type="checkbox" [checked]="note().isImportant"
      [disabled]="!isEdition()" (change)="changeEmit()"
      /> Important </label>
      <div class="buttons">
        <button (click)="isEdition.set(true)">Edit</button>
        <button (click)="deleteEmit()">Delete</button>
      </div>
    </ind-card>

  `,
  styles: `
  ind-card {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  },
  h3 {
    margin: 0;
  },

  `,
})
export class NoteItem {
  readonly note = input.required<Note>();
  protected readonly deleteEvent = output<void>();
  protected readonly isEdition = signal<boolean>(false);
  protected readonly changeEvent = output<Note>();

  // Función para emitir el evento de click en el boton de Delete,
  // que se propaga hacia el componente padre (NotesList) para eliminar la nota correspondiente.
  // En el padre se recibe el evento y se llama a la función delete() con el id de la nota a eliminar.
  protected deleteEmit() {
    this.deleteEvent.emit();
  }

  // Función para emitir el evento de cambio en el estado de edición de la nota,
  // que se propaga hacia el componente padre (NotesList) para actualizar la nota correspondiente.
  // En el padre se recibe el evento y se llama a la función update() con el id de la nota a actualizar.
  protected changeEmit() {
    const updatedNote: Note = {
      ...this.note(),
      isImportant: !this.note().isImportant,
    };
    this.changeEvent.emit(updatedNote);
    this.isEdition.set(false);
  }



}
