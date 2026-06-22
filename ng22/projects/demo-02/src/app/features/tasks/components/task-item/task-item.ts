import { Component, input, output, signal } from '@angular/core';
import { Task } from '../../entities/task';
import { Card } from '../../../../core/components/card/card';

@Component({
  selector: 'ind-task-item',
  imports: [Card],
  template: `
    <ind-card>
      <h3>{{ task().title }}</h3>
      <p>Author: {{ task().author }}</p>
      <label>
        <input
          type="checkbox"
          [checked]="task().isImportant"
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
export class TaskItem {
  readonly task = input.required<Task>();
  // protected readonly deleteEvent = output<Task['id']>();
  protected readonly deleteEvent = output<void>();
  protected readonly changeEvent = output<Task>();
  protected readonly isEdition = signal<boolean>(false);

  deleteEmit() {
    this.deleteEvent.emit();
  }

  changeEmit() {
    const updatedTask: Task = {
      ...this.task(),
      isImportant: !this.task().isImportant,
    };

    this.changeEvent.emit(updatedTask);
    this.isEdition.set(false);
  }
}
