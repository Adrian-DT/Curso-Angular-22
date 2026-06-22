import { Service } from '@angular/core';
import { Task } from '../model/task';
import TASKS from '../data/tasks-mock.json';
import { Store } from '../../../core/types/store';

@Service()
export class TasksStore implements Store<Task> {
  // Variable privada para almacenar las tareas, inicializada con los datos de TASKS importados desde el archivo JSON.
  private tasks: Task[] = TASKS;

  // Implementación del método get para obtener todas las tareas. Se devuelve el arreglo completo de tareas almacenadas en la variable privada tasks.
  get(): Task[] {
    return this.tasks;
  }

  // Implementación del método getById para obtener una tarea por su ID. Se utiliza el método find para buscar la tarea correspondiente en el arreglo de tareas.
  getById(id: Task['id']): Task {
    return this.tasks.find((task) => task.id === id)!;
  }

  // Implementación del método add para agregar una nueva tarea. Se genera un ID único utilizando crypto.randomUUID() y se agrega la nueva tarea al arreglo de tareas.
  add(newTask: Omit<Task, 'id'>): Task {
    const id = crypto.randomUUID().slice(0, 6);
    const task: Task = { ...newTask, id };
    this.tasks = [...this.tasks, task];
    return task;
  }

  // Implementación del método update para actualizar una tarea existente.
  update(updateTask: Task): Task {
    const index = this.tasks.findIndex((task) => task.id === updateTask.id);
    if (index !== -1) {
      this.tasks[index] = updateTask;
    }
    return updateTask;
  }

  // Implementación del método delete para eliminar una tarea existente por su ID.
  delete(id: Task['id']): void {
    this.tasks = this.tasks.filter((task) => task.id !== id);
  }

  // Implementación del método patch para actualizar parcialmente una tarea existente.
  patch(id: Task['id'], partialTask: Partial<Omit<Task, 'id'>>): Task {
    const task = this.getById(id);
    const updatedTask = { ...task, ...partialTask };
    this.update(updatedTask);
    return updatedTask;
  }
}
