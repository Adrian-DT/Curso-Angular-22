import { Service } from '@angular/core';
import { StoreRx } from '../../../core/types/store.rx';
import { Task } from '../entities/task';
import { delay, Observable, of } from 'rxjs';
import TASKS from '../data/tasks-mock.json';

@Service()
export class TasksStoreRx implements StoreRx<Task> {
  private tasks: Task[] = TASKS;
  private mockDelay = 500

  get(): Observable<Task[]> {
    return of(this.tasks).pipe(
      delay(this.mockDelay)
    );
  }

  getById(id: Task['id']): Observable<Task> {
    const task = this.tasks.find((task) => task.id === id);
    if (!task) {
      throw new Error(`Task with ID ${id} not found`);
    }
    return of(task).pipe(
      delay(this.mockDelay) // Simulamos un retraso de 500 milisegundos para la carga de la tarea
    );
  }

  add(newTask: Omit<Task, 'id'>): Observable<Task> {
    const id = crypto.randomUUID().slice(0, 6);
    const task: Task = { ...newTask, id };
    this.tasks = [...this.tasks, task];
    return of(task).pipe(
      delay(this.mockDelay) // Simulamos un retraso de 500 milisegundos para la adición de la tarea
    );
  }

  delete(id: Task['id']): Observable<void> {
    this.tasks = this.tasks.filter((task) => task.id !== id);
    return of(undefined).pipe(
      delay(this.mockDelay) // Simulamos un retraso de 500 milisegundos para la eliminación de la tarea
    );
  }

  update(updatedTask: Task): Observable<Task> {
    this.tasks = this.tasks.map((task) =>
      task.id === updatedTask.id ? updatedTask : task
    );
    return of(this.tasks.find((task) => task.id === updatedTask.id) as Task).pipe(
      delay(this.mockDelay) // Simulamos un retraso de 500 milisegundos para la actualización de la tarea
    );
  }
}


