import { Service } from '@angular/core';
import { Task } from '../entities/task';
import TASKS from '../data/tasks-mock.json';
import { Store } from '../../../core/types/store';

@Service()
export class TasksStore implements Store<Task> {
  private tasks: Task[] = TASKS;

  get(): Task[] {
    return this.tasks;
    
    // setTimeout(() => {
    // }, 500);
  }

  getById(id: Task['id']): Task {
    const task = this.tasks.find((task) => task.id === id);
    if (!task) {
      throw new Error(`Task with ID ${id} not found`);
    }
    return task;
  }

  add(newTask: Omit<Task, 'id'>) {
    const id = crypto.randomUUID().slice(0, 6);
    const task: Task = { ...newTask, id };
    this.tasks = [...this.tasks, task];
    return task;
  }

  delete(id: Task['id']) {
    this.tasks = this.tasks.filter((task) => task.id !== id);
  }

  update(updatedTask: Task) {
    this.tasks = this.tasks.map((task) =>
      task.id === updatedTask.id ? updatedTask : task
    );
    return this.tasks.find((task) => task.id === updatedTask.id) as Task;
  }
}
