import { Component, inject, input, signal } from '@angular/core';
import { Task } from '../../model/task';
import { Card } from '../../../../core/components/card/card';
import { TasksStoreRx } from '../../services/tasks-store-rx';

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
          (change)="changeTask()"
        />
        Important
      </label>
      <div class="buttons">
        <button (click)="isEdition.set(true)">Edit</button>
        <button (click)="deleteTask()">Delete</button>
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
  protected readonly taskStore = inject(TasksStoreRx);

  readonly task = input.required<Task>();

  protected readonly isEdition = signal<boolean>(false);

  deleteTask() {
    this.taskStore.delete(this.task().id);
  }

  changeTask() {
    this.taskStore.update({
      ...this.task(),
      isImportant: !this.task().isImportant,
    });
  }
}
