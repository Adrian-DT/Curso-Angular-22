import { Component, inject, signal } from '@angular/core';
import { TaskItem } from '../task-item/task-item';
import { TaskForm } from '../task-form/task-form';
import { Task } from '../../entities/task';
import { TasksStoreRx } from '../../services/tasks-store-rx';

@Component({
  selector: 'ind-tasks-list',
  imports: [TaskItem, TaskForm],
  template: `
    @if (isLoading()) {
      <p>Loading tasks...</p>
    } @else if (error()) {
      <p>Error: {{ error() }}</p>
    } @else {
      <details #details>
        <summary>Add Task</summary>
        <ind-task-form (addEvent)="add($event)" />
      </details>
      <div class="tasks-list">
        @for (task of tasks(); track task.id) {
          <!-- <ind-task-item [task]="task" (deleteEvent)="delete($event)" /> -->
          <ind-task-item
            [task]="task"
            (deleteEvent)="delete(task.id)"
            (changeEvent)="change($event)"
          />
        }
      </div>
    }
    <p>Lista que utiliza Observable de RxJS</p>
    <!-- <pre>{{ tasks() | json }}</pre> -->
  `,
  styles: `
    .tasks-list {
      display: flex;
      flex-wrap: wrap;
      gap: 1rem;
    }
  `,
})
export class TasksList {
  protected tasks = signal<Task[]>([]);
  protected isLoading = signal<boolean>(true);
  protected error = signal<string | null>(null);

  private tasksStore = inject(TasksStoreRx);

  constructor() {
    this.tasksStore.get().subscribe({
      next: (tasks) => {
        this.tasks.set(tasks);
        this.isLoading.set(false);
      },
      error: (error) => {
        this.isLoading.set(false);
        this.error.set(error.message);
      },
    });
  }

  add(newTask: Omit<Task, 'id'>) {
    // const task = this.tasksStore.addTask(newTask);
    // this.tasks.set([...this.tasks(), task]);

    // Alternativa: actualizamos a la última version del store
    this.tasksStore.add(newTask);
    this.tasksStore.get().subscribe({
      next: (tasks) => {
        this.tasks.set(tasks);
      }
    });
  }

  delete(id: Task['id']) {
    this.tasksStore.delete(id);
    // this.tasks.set(this.tasks().filter((task) => task.id !== id));
    this.tasksStore.get().subscribe({
      next: (tasks) => {
        this.tasks.set(tasks);
      }
    });
  }

  change(updatedTask: Task) {
    // const updated = this.tasksStore.updateTask(updatedTask);
    //this.tasks.set(this.tasks().map((task) => (task.id === updatedTask.id ? updated : task)));

    this.tasksStore.update(updatedTask);
    this.tasksStore.get().subscribe({
      next: (tasks) => {
        this.tasks.set(tasks);
      }
    });
  }
}
