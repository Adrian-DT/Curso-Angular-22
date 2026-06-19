import { Component, inject, signal } from '@angular/core';
import { JsonPipe } from '@angular/common';
import { TaskItem } from "../task-item/task-item";
import { Task } from '../../model/task';
import { TasksForm } from "../tasks-form/tasks-form";
import { TasksStore } from '../../services/tasks-store';
import { TasksStoreAsync } from '../../services/tasks-store-async';


@Component({
  selector: 'ind-tasks-list',
  imports: [TaskItem, TasksForm, JsonPipe],
  template: `
  @if (isLoading()) {
    <p>Loading tasks...</p>

  } @else if (error()) {
    <p>Error loading tasks: {{ error() }}</p>
  } @else {

    <details #details>
      <summary> Add Task </summary>
      <ind-tasks-form (addEvent)="add($event)" />
    </details>

    <div class="tasks-list">
      @for (note of tasks(); track note.id) {
        <ind-task-item [note]="note" (deleteEvent)="delete(note.id)" (changeEvent)="update($event)" />
      }
    </div>
    }

  <pre>{{ tasks() | json }}</pre>


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
  protected readonly tasks = signal<Task[]>([]);
  protected readonly isLoading = signal<boolean>(true);
  protected readonly error = signal<string | null>(null);

  private tasksStore = inject(TasksStore);
  private readonly tasksStoreAsync = inject(TasksStoreAsync);

  constructor() {
      this.tasks.set(this.tasksStore.get());
      this.isLoading.set(false);
  }

  // Evento para eliminar una nota de la lista de notas, que se propaga desde el componente hijo (TaskItem) hacia el componente padre (TasksList).
  // Se recibe el id de la nota a eliminar y se llama al servicio TasksStore para eliminar la nota correspondiente.
  // Luego se actualiza la lista de notas con el método getTasks() del servicio TasksStore.
  protected delete(id: Task['id']) {
    this.tasksStore.delete(id);
    this.tasks.set(this.tasksStore.get());
  }

  // Evento para actualizar una nota de la lista de notas, que se propaga desde el componente hijo (TaskItem) hacia el componente padre (TasksList).
  // Se recibe la nota actualizada y se llama al servicio TasksStore para actualizar la nota correspondiente.
  // Luego se actualiza la lista de notas con el método getTasks() del servicio TasksStore.
  protected update(updatedTask: Task) {
    this.tasksStore.update(updatedTask);
    this.tasks.set(this.tasksStore.get());
  }

  // Evento para agregar una nueva nota a la lista de notas, que se propaga desde el componente hijo (TasksForm) hacia el componente padre (TasksList).
  // Se recibe la nueva nota y se llama al servicio TasksStore para agregar la nota correspondiente.
  // Luego se actualiza la lista de notas con el método getTasks() del servicio TasksStore.
  protected add(newTask: Omit<Task, 'id'>) {
    this.tasksStore.add(newTask);
    this.tasks.set(this.tasksStore.get());
  }

}
