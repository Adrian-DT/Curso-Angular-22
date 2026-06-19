import { Service } from '@angular/core';
import { Task } from '../model/task';
import TASKS from '../data/tasks-mock.json';
import { Store } from '../../../core/types/store';

@Service()
export class TasksStore implements Store<Task> {
  // Variable privada para almacenar las tareas, inicializada con los datos de TASKS importados desde el archivo JSON.
  private tasks: Task[] = TASKS;

  get(): Task[] {
    return this.tasks;
  }

  getById(id: Task['id']): Task {
    return this.tasks.find(task => task.id === id)!;
  }

  add(newTask: Omit<Task, 'id'>): Task {
    const id = crypto.randomUUID().slice(0, 6);
    const task: Task = { ...newTask, id };
    this.tasks = [...this.tasks, task];
    return task;
  }

  update(updateTask: Task): Task {
    const index = this.tasks.findIndex(task => task.id === updateTask.id);
    if (index !== -1) {
      this.tasks[index] = updateTask;
    }
    return updateTask;
  }

  delete(id: Task['id']): void {
    this.tasks = this.tasks.filter(task => task.id !== id);
  }

  patch(id: Task['id'], partialTask: Partial<Omit<Task, 'id'>>): Task {
    const task = this.getById(id);
    const updatedTask = { ...task, ...partialTask };
    this.update(updatedTask);
    return updatedTask;
  }

}
