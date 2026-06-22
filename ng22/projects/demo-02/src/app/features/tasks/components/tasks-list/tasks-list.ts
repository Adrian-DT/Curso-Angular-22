import { Component, inject, signal } from '@angular/core';
import { TaskItem } from '../task-item/task-item';
import { TaskForm } from '../task-form/task-form';
import { Task } from '../../model/task';
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
        <ind-task-form />
      </details>
      <div class="tasks-list">
        @for (task of tasks(); track task.id) {
          <!-- <ind-task-item [task]="task" (deleteEvent)="delete($event)" /> -->
          <ind-task-item [task]="task" />
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
  private tasksStore = inject(TasksStoreRx);

  protected tasks = signal<Task[]>([]);
  protected isLoading = signal<boolean>(true);
  protected error = signal<string | null>(null);

  constructor() {
    // Nos suscribimos al Observable tasks$ del store para recibir actualizaciones en tiempo real de la lista de tareas.
    this.tasksStore.tasks$.subscribe({
      next: (tasks) => {
        this.tasks.set(tasks);
        this.isLoading.set(false);
      },
      error: (error) => {
        this.isLoading.set(false);
        this.error.set(error.message);
      },
    });
    // Inicializamos la lista de tareas llamando al método get() del store, que obtiene las tareas desde el repositorio.
    // this.tasksStore.get();
  }

  // El método add se encarga de añadir una nueva tarea a la lista de tareas.
  add(newTask: Omit<Task, 'id'>) {
    // Llamamos al método add del store para añadir una nueva tarea.
    // El store se encargará de actualizar el BehaviorSubject y
    // notificar a todos los suscriptores (incluido este componente)
    //  con la nueva lista de tareas.
    this.tasksStore.tasks$.subscribe({
      next: (tasks) => {
        const createdTask = tasks.find((task) => task.title === newTask.title);
        if (createdTask) {
          this.tasks.update((tasks) => [...tasks, createdTask]);
        }
      },
      error: (err) => {
        this.error.set(err.message || 'Unknown error');
        console.error('Error adding task:', err);
      },
    });
    this.tasksStore.add(newTask);
  }

  // El método delete se encarga de eliminar una tarea de la lista de tareas por su ID.
  delete(id: Task['id']) {
    // Llamamos al método delete del store para eliminar una tarea por su ID.
    // El store se encargará de actualizar el BehaviorSubject y
    // notificar a todos los suscriptores (incluido este componente)
    // con la nueva lista de tareas.
    this.tasksStore.tasks$.subscribe({
      next: (tasks) => {
        this.tasks.set(tasks.filter((task) => task.id !== id));
      },
      error: (err) => {
        this.error.set(err.message || 'Unknown error');
        console.error(`Error deleting task with id ${id}:`, err);
      },
    });
  }

  // El método change se encarga de actualizar una tarea existente en la lista de tareas.
  change(updatedTask: Task) {
    // Llamamos al método update del store para actualizar una tarea existente.
    // El store se encargará de actualizar el BehaviorSubject y
    // notificar a todos los suscriptores (incluido este componente)
    // con la nueva lista de tareas.
    this.tasksStore.tasks$.subscribe({
      next: (tasks) => {
        this.tasks.set(tasks.map((task) => (task.id === updatedTask.id ? updatedTask : task)));
      },
      error: (err) => {
        this.error.set(err.message || 'Unknown error');
        console.error('Error updating task:', err);
      },
    });
  }
}
