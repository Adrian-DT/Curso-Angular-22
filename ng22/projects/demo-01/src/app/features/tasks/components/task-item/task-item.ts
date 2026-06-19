import { Component, input, output, signal } from '@angular/core';
import { Task } from '../../model/task';
import { Card } from "../../../home/components/card/card";

@Component({
  selector: 'ind-task-item',
  imports: [Card],
  template: `
  <ind-card>
      <h3>{{ note().title }}</h3>
      <p>{{ note().content }}</p>
      <p>Author: {{ note().author }}</p>
      <label>
        <input type="checkbox" [checked]="note().isImportant" [disabled]="!isEdition()" /> Important
      </label>
      <div class="buttons">
        <button (click)="isEdition.set(!isEdition())" (changed)="changeEmit()">Edit</button>
        <button (click)="onDelete()">Delete</button>
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
export class TaskItem {
  readonly note = input.required<Task>();
  protected readonly deleteEvent = output<void>();
  protected readonly isEdition = signal<boolean>(false);
  protected readonly changeEvent = output<Task>();

  // Función para emitir el evento de click en el boton de Delete,
  // que se propaga hacia el componente padre (TasksList) para eliminar la nota correspondiente.
  // En el padre se recibe el evento y se llama a la función delete() con el id de la nota a eliminar.
  protected onDelete() {
    this.deleteEvent.emit();
  }

  // Función para emitir el evento de cambio en el estado de edición de la nota,
  // que se propaga hacia el componente padre (TasksList) para actualizar la nota correspondiente.
  // En el padre se recibe el evento y se llama a la función update() con el id de la nota a actualizar.
  protected changeEmit() {
    const updatedNote: Task = {
      ...this.note(),
      isImportant: !this.note().isImportant,
    };
    this.changeEvent.emit(updatedNote);
    this.isEdition.set(false);
  }



}
