import { Service } from '@angular/core';

import { Task } from '../entities/task';
import TASKS from '../data/tasks-mock.json';
import { StoreAsync } from '../../../core/types/store.async';

@Service()
export class TasksStoreAsync implements StoreAsync<Task> {
  private tasks: Task[] = TASKS;

  private delay(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  async get(): Promise<Task[]> {
    await this.delay(500);
    return this.tasks;
  }

  async getById(id: Task['id']): Promise<Task> {
    const task = this.tasks.find((task) => task.id === id);
    if (!task) {
      throw new Error(`Task with ID ${id} not found`);
    }
    return task;
  }

  async add(newTask: Omit<Task, 'id'>): Promise<Task> {
    const id = crypto.randomUUID().slice(0, 6);
    const task: Task = { ...newTask, id };
    this.tasks = [...this.tasks, task];
    return task;
  }

  async delete(id: Task['id']): Promise<void> {
    this.tasks = this.tasks.filter((task) => task.id !== id);
  }

  async update(updatedTask: Task): Promise<Task> {
    this.tasks = this.tasks.map((task) =>
      task.id === updatedTask.id ? updatedTask : task
    );
    return this.tasks.find((task) => task.id === updatedTask.id) as Task;
  }
}

