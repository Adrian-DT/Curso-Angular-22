import { Component, signal } from '@angular/core';
import { JsonPipe } from '@angular/common';
import { NoteItem } from "../note-item/note-item";
import { NoteForm } from "../note-form/note-form";
import { Note } from '../../model/note';
import NOTES from '../../data/notes-mock.json';

@Component({
  selector: 'ind-notes-list',
  imports: [NoteItem, NoteForm, JsonPipe],
  template: `
    @if (isLoading()) {
      <p>Loading notes...</p>
    } @else if (error()) {
      <p>Error: {{ error() }}</p>
    } @else {
      <details #details>
        <summary>Add Note</summary>
        <ind-note-form (addEvent)="add($event)" />
      </details>
      <div class="notes-list">
      @for (note of notes(); track note.id) {
        <!-- <ind-note-item [note]="note" (deleteEvent)="delete($event)" /> -->
        <ind-note-item [note]="note" (deleteEvent)="delete(note.id)"
        (changeEvent)="update($event)"
        />
      }Curso-Angular-22
      </div>
    }
  <pre>{{ notes() | json }}</pre>


  `,
  styles: `
  .notes-list {
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
  }
  `,
})
export class NotesList {
  protected readonly notes = signal<Note[]>([]);
  protected readonly isLoading = signal<boolean>(true);
  protected readonly error = signal<string | null>(null);

  constructor() {
    setTimeout(() => {
      this.notes.set(NOTES);
      this.isLoading.set(false);
    }, 2000);
  }

  // Evento para eliminar una nota de la lista de notas, que se propaga desde el componente hijo (NoteItem) hacia el componente padre (NotesList).
  // Se recibe el id de la nota a eliminar y se filtra la lista de notas para eliminar la nota correspondiente.
  protected delete(id: Note['id']) {
    this.notes.set(this.notes().filter(note => note.id !== id));
  }

  // Evento para actualizar una nota de la lista de notas, que se propaga desde el componente hijo (NoteItem) hacia el componente padre (NotesList).
  // Se recibe la nota actualizada y se busca la nota correspondiente en la lista de notas para actualizarla.
  protected update(updatedNote: Note) {
    this.notes.set(this.notes().map(note => note.id === updatedNote.id ? updatedNote : note));
  }

  // Evento para añadir una nota a la lista de notas, que se propaga desde el componente hijo (NoteForm) hacia el componente padre (NotesList).
  // Se recibe la nota sin id y se genera un id único para la nota antes de añadirla a la lista de notas.
  protected  add(newNote: Omit<Note, 'id'>) {
    const noteWithId: Note = {
      ...newNote,
      id: crypto.randomUUID().slice(0, 6), // Generamos un id único para la nota, tomando los primeros 6 caracteres del UUID generado por crypto.randomUUID().
    };
    this.notes.set([...this.notes(), noteWithId]);
  }


}
