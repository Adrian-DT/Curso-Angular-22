import { DestroyRef, inject, Service, signal } from '@angular/core';
import { Task } from '../model/task';
import { ApiRepo } from './api-repo';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { delay } from 'rxjs';

interface TasksStore {
  tasks: Task[];
  isLoading: boolean;
  error: Error | null;
}

@Service()
export class TasksStoreSignal {
  // Inyectamos el repositorio de API para interactuar con el backend o la fuente de datos.
  readonly #repo = inject(ApiRepo);

  // Inyectamos el servicio DestroyRef para poder utilizar el operador takeUntilDestroyed en nuestras suscripciones a Observables,
  // lo que nos permite cancelar automáticamente las suscripciones cuando el componente se destruye, evitando así posibles fugas de memoria.
  readonly #destroyRef = inject(DestroyRef);

  // Con signal, te permite obtener siempre el último valor emitido.
  readonly #tasks = signal<TasksStore>({
    tasks: [],
    error: null,
    isLoading: false,
  });
  // Exponemos el Observable de tareas para que los componentes puedan suscribirse a él y recibir actualizaciones en tiempo real.
  readonly tasks$ = this.#tasks.asReadonly();

  readonly #mockDelay = 500;

  // No necesito devolver nada porque el componente se suscribe al Observable tasks$ para recibir las actualizaciones de las tareas.
  // Al llamar a get(), se actualiza el BehaviorSubject con los datos obtenidos del repositorio, y cualquier componente
  // suscrito a tasks$ recibirá automáticamente la nueva lista de tareas.
  get() {
    // Al llamar al método get() del repositorio, nos suscribimos al Observable que devuelve para obtener las tareas.
    this.#repo
      .get()
      .pipe(delay(this.#mockDelay)) // Simulamos un retraso de 500 milisegundos para la carga de las tareas
      .pipe(takeUntilDestroyed(this.#destroyRef)) // Utilizamos takeUntilDestroyed para cancelar la suscripción automáticamente cuando el componente se destruya.
      .subscribe({
        next: (tasks) => {
          this.#tasks.set({ tasks, error: null, isLoading: false });
        },
        // En caso de error, actualizamos el BehaviorSubject con un array vacío para que los componentes suscritos reciban una lista vacía de tareas,
        // y también podemos manejar el error de otras formas (mostrar un mensaje de error, etc.).
        error: (err) => {
          console.error('Error fetching tasks:', err);
          this.#tasks.set({ tasks: [], error: err, isLoading: false });
        },
      });
  }

  // El método add se encarga de añadir una nueva tarea a la lista de tareas.
  // Al llamar al método add del repositorio, nos suscribimos al Observable
  // que devuelve para obtener la tarea creada con su ID generado por el backend.
  // Luego, actualizamos el BehaviorSubject con la nueva lista de tareas que incluye la tarea recién creada.
  add(newTask: Omit<Task, 'id'>) {
    // Al llamar al método add del repositorio, nos suscribimos
    // al Observable que devuelve para obtener la tarea creada con su ID generado por el backend.
    this.#repo
      .add(newTask)
      .pipe(delay(this.#mockDelay))
      .pipe(takeUntilDestroyed(this.#destroyRef)) // Utilizamos takeUntilDestroyed para cancelar la suscripción automáticamente cuando el componente se destruya.
      .subscribe({
        next: (task) => {
          // Para añadir la nueva tarea al BehaviorSubject, obtenemos el valor actual de las tareas utilizando getValue(),
          // añadimos la nueva tarea al array y luego emitimos el nuevo array actualizado con next().
          const currentTasks = this.#tasks();
          this.#tasks.set({ tasks: [...currentTasks.tasks, task], error: null, isLoading: false });
        },
      });
  }

  delete(id: Task['id']) {
    this.#repo
      .delete(id)
      .pipe(delay(this.#mockDelay))
      .pipe(takeUntilDestroyed(this.#destroyRef)) // Utilizamos takeUntilDestroyed para cancelar la suscripción automáticamente cuando el componente se destruya.
      .subscribe({
        next: () => {
          const currentTasks = this.#tasks();
          const updatedTasks = currentTasks.tasks.filter((task) => task.id !== id);
          this.#tasks.set({ tasks: updatedTasks, error: null, isLoading: false });
        },
        error: (err) => {
          console.error(`Error deleting task with id ${id}:`, err);
          // En caso de error, no actualizamos el BehaviorSubject para evitar que la aplicación se quede con datos inconsistentes.
        },
      });
  }

  update(updatedTask: Task) {
    this.#repo
      .add(updatedTask)
      .pipe(delay(this.#mockDelay))
      .pipe(takeUntilDestroyed(this.#destroyRef)) // Utilizamos takeUntilDestroyed para cancelar la suscripción automáticamente cuando el componente se destruya.
      .subscribe({
        next: (task) => {
          const currentTasks = this.#tasks();
          const updatedTasks = currentTasks.tasks.map((t) => (t.id === task.id ? task : t));
          this.#tasks.set({ tasks: updatedTasks, error: null, isLoading: false });
        },
        error: (err) => {
          console.error('Error updating task:', err);
          // En caso de error, no actualizamos el BehaviorSubject para evitar que la aplicación se quede con datos inconsistentes.
        },
      });
  }
}
