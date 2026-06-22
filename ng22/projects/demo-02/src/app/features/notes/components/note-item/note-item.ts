import { Component, input, output, signal } from '@angular/core';
import { Note } from '../../model/note';
import { Card } from '../../../../core/components/card/card';

@Component({
  selector: 'ind-note-item',
  imports: [Card],
  template: `
    <ind-card>
      <h3>{{ note().title }}</h3>
      <p>Author: {{ note().author }}</p>
      <label>
        <input
          type="checkbox"
          [checked]="note().isImportant"
          [disabled]="!isEdition()"
          (change)="changeEmit()"
        />
        Important
      </label>
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
    }
    h3 {
      margin: 0;
    }
  `,
})
export class NoteItem {
  readonly note = input.required<Note>();
  // protected readonly deleteEvent = output<Note['id']>();
  protected readonly deleteEvent = output<void>();
  protected readonly changeEvent = output<Note>();
  protected readonly isEdition = signal<boolean>(false);

  deleteEmit() {
    this.deleteEvent.emit();
  }

  changeEmit() {
    const updatedNote: Note = {
      ...this.note(),
      isImportant: !this.note().isImportant,
    };

    this.changeEvent.emit(updatedNote);
    this.isEdition.set(false);
  }
}
