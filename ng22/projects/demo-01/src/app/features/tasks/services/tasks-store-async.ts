import { Service } from '@angular/core';
import { Task } from '../model/task';
import TASKS from '../data/tasks-mock.json';
import { StoreAsync } from '../../../core/types/store-async';

@Service()
export class TasksStoreAsync implements StoreAsync<Task> {

  // Variable privada para almacenar las tareas, inicializada con los datos de TASKS importados desde el archivo JSON.
  private tasks: Task[] = TASKS;

  async get(): Promise<Task[]> {
    // await this.delay(5000); // Simula un retraso de 500 ms
    return this.tasks;
  }

  async getById(id: Task['id']): Promise<Task> {
    return this.tasks.find(task => task.id === id)!;
  }

  async add(newTask: Omit<Task, 'id'>): Promise<Task> {
    const id = crypto.randomUUID().slice(0, 6);
    const task: Task = { ...newTask, id };
    this.tasks = [...this.tasks, task];
    return task;
  }

  async update(updateTask: Task): Promise<Task> {
    const index = this.tasks.findIndex(task => task.id === updateTask.id);
    if (index !== -1) {
      this.tasks[index] = updateTask;
    }
    return updateTask;
  }

  async delete(id: Task['id']): Promise<void> {
    this.tasks = this.tasks.filter(task => task.id !== id);
  }

  async patch(id: Task['id'], partialTask: Partial<Omit<Task, 'id'>>): Promise<Task> {
    const task = await this.getById(id);
    const updatedTask = { ...task, ...partialTask };
    this.update(updatedTask);
    return updatedTask;
  }

}
