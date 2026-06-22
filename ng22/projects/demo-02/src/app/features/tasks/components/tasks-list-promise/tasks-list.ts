import { Component, inject, signal } from '@angular/core';
import { TaskItem } from '../task-item/task-item';
import { TaskForm } from '../task-form/task-form';
import { Task } from '../../entities/task';
import { TasksStoreAsync } from '../../services/tasks-store-async';

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
    <p>Lista basada en Promises</p>
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

  private tasksStore = inject(TasksStoreAsync);

  constructor() {
    this.tasksStore
      .get()
      .then((tasks) => {
        this.tasks.set(tasks);
      })
      .catch((error) => {
        this.error.set(error.message);
      })
      .finally(() => {
        this.isLoading.set(false);
      });
  }

  add(newTask: Omit<Task, 'id'>) {
    // const task = this.tasksStore.addTask(newTask);
    // this.tasks.set([...this.tasks(), task]);

    // Alternativa: actualizamos a la última version del store
    this.tasksStore.add(newTask);
    this.tasksStore.get().then((tasks) => {
      this.tasks.set(tasks);
    });
  }

  delete(id: Task['id']) {
    this.tasksStore.delete(id);
    // this.tasks.set(this.tasks().filter((task) => task.id !== id));
    this.tasksStore.get().then((tasks) => {
      this.tasks.set(tasks);
    });
  }

  change(updatedTask: Task) {
    // const updated = this.tasksStore.updateTask(updatedTask);
    //this.tasks.set(this.tasks().map((task) => (task.id === updatedTask.id ? updated : task)));

    this.tasksStore.update(updatedTask);
    this.tasksStore.get().then((tasks) => {
      this.tasks.set(tasks);
    });
  }
}
