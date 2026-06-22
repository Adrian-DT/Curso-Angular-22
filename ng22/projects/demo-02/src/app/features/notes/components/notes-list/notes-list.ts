import { Component, DestroyRef, inject, signal } from '@angular/core';
import { NoteItem } from '../note-item/note-item';
import { NoteForm } from '../note-form/note-form';
import { Note } from '../../model/note';
import { ApiRepo } from '../../services/api-repo';
import { HttpErrorResponse } from '@angular/common/http';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'ind-notes-list',
  imports: [NoteItem, NoteForm],
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
          <ind-note-item
            [note]="note"
            (deleteEvent)="delete(note.id)"
            (changeEvent)="change($event)"
          />
        }
      </div>
    }
    <!-- <pre>{{ notes() | json }}</pre> -->
  `,
  styles: `
    .notes-list {
      display: flex;
      flex-wrap: wrap;
      gap: 1rem;
    }
  `,
})
// Podemos implementar la interfaz OnDestroy para definir el hook ngOnDestroy, que se ejecuta cuando el componente se destruye, lo que nos permite cancelar las suscripciones a Observables y evitar fugas de memoria.
export class NotesList {
  // Inyectamos el servicio ApiRepo para poder interactuar con la API REST y obtener, añadir, actualizar y eliminar notas.
  protected readonly apiRepo = inject(ApiRepo);

  // Inyectamos el servicio DestroyRef para poder utilizar el operador takeUntilDestroyed en nuestras suscripciones a Observables,
  // lo que nos permite cancelar automáticamente las suscripciones cuando el componente se destruye, evitando así posibles fugas de memoria.
  readonly #destroyRef = inject(DestroyRef);

  protected readonly notes = signal<Note[]>([]);
  protected readonly isLoading = signal<boolean>(true);
  protected readonly error = signal<string | null>(null);

  // Podemos almacenar todas las suscripciones que tengamos en un array para luego cancelarlas
  // todas de golpe en el hook ngOnDestroy, evitando así posibles fugas de memoria.
  // protected readonly subscriptions: Subscription[] = [];

  // El hook ngOnDestroy se ejecuta cuando el componente se destruye, lo que puede ocurrir cuando el usuario
  // navega a otra página o cierra la aplicación. En este hook, cancelamos todas
  // las suscripciones almacenadas en el array subscriptions para evitar fugas de memoria.
  // ngOnDestroy() {
  //   this.subscriptions.forEach((sub) => sub.unsubscribe());
  //   console.log('All subscriptions have been unsubscribed.');
  // }

  // En el constructor, hacemos una llamada al método get() del servicio ApiRepo para obtener las notas de la API REST.
  // Nos suscribimos al Observable devuelto por el método get() y manejamos los casos de éxito, error y finalización de la operación.
  constructor() {
    this.apiRepo
      .get()
      .pipe(
        takeUntilDestroyed(this.#destroyRef), // Utilizamos el operador takeUntilDestroyed para cancelar automáticamente la suscripción cuando el componente se destruya, evitando así fugas de memoria.
      )
      .subscribe({
        // Next se ejecuta en caso de que todo vaya bien y recibamos los datos de la API REST.
        // En este caso, actualizamos la señal notes con los datos recibidos y establecemos isLoading a false.
        next: (notes) => {
          this.notes.set(notes);
        },
        // Error se ejecuta en caso de que ocurra un error al intentar obtener los datos de la API REST.
        // En este caso, actualizamos la señal error con el mensaje de error recibido y establecemos isLoading a false.
        error: (err) => {
          this.error.set(err.message || 'Unknown error');
          console.error('Error loading notes:', err);
          this.isLoading.set(false);
        },
        // Complete se ejecuta cuando la operación de obtener los datos de la API REST ha finalizado,
        // independientemente de si ha sido exitosa. En este caso, establecemos isLoading a false.
        complete: () => {
          this.isLoading.set(false);
          console.log('Notes loaded:', this.notes());
        },
      });
    // this.subscriptions.push(subscription);
  }

  // El método delete(id: Note['id']) se ejecuta cuando se emite el evento deleteEvent desde el componente NoteItem, lo que indica que se ha solicitado eliminar una nota.
  // Este método hace una llamada al método delete() del servicio ApiRepo para eliminar la nota de la API REST.
  // Nos suscribimos al Observable devuelto por el método delete() y manejamos los casos de éxito y error de la operación.
  delete(id: Note['id']) {
    this.apiRepo.delete(id).subscribe({
      next: () => {
        this.notes.set(this.notes().filter((note) => note.id !== id));
        console.log(`Note with id ${id} deleted successfully.`);
      },
      error: (err) => {
        this.error.set(err.message || 'Unknown error');
        console.error(`Error deleting note with id ${id}:`, err);
      },
    });
    // this.subscriptions.push(subscription);
  }

  // El método change(updatedNote: Note) se ejecuta cuando se emite el evento changeEvent desde el componente NoteItem, lo que indica que se ha actualizado una nota.
  // Este método hace una llamada al método update() del servicio ApiRepo para actualizar la nota en la API REST.
  // Nos suscribimos al Observable devuelto por el método update() y manejamos los casos de éxito y error de la operación.
  change(updatedNote: Note) {
    this.apiRepo.update(updatedNote).subscribe({
      next: (note) => {
        this.notes.set(this.notes().map((n) => (n.id === note.id ? note : n)));
      },
      error: (err: HttpErrorResponse) => {
        this.error.set(err.message || 'Unknown error');
        console.error('Error updating note:', err);
      },
    });
    // this.subscriptions.push(subscription);
  }

  // El método add(newNote: Omit<Note, 'id'>) se ejecuta cuando se emite el evento addEvent desde el componente NoteForm, lo que indica que se ha enviado un nuevo formulario de nota.
  // Este método hace una llamada al método add() del servicio ApiRepo para añadir la nueva nota a la API REST.
  // Nos suscribimos al Observable devuelto por el método add() y manejamos los casos de éxito y error de la operación.
  add(newNote: Omit<Note, 'id'>) {
    this.apiRepo.add(newNote).subscribe({
      next: (createdNote) => {
        this.notes.update((notes) => [...notes, createdNote]);
      },
      error: (err: HttpErrorResponse) => {
        this.error.set(err.message || 'Unknown error');
        console.error('Error adding note:', err);
      },
    });
    // this.subscriptions.push(subscription);
  }
}
