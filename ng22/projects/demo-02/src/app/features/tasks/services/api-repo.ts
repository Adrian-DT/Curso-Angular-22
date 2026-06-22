import { inject, Service } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { StoreRx as Repo } from '../../../core/types/store.rx';
import { Task } from '../model/task';
import { map, Observable } from 'rxjs';

@Service()
export class ApiRepo implements Repo<Task> {
  // Inyectamos el servicio HttpClient para poder hacer peticiones HTTP a la API REST.
  readonly #httpClient = inject(HttpClient);
  // Definimos la URL base de la API REST, que se obtiene del archivo de configuración de entornos. Esto nos permite cambiar la URL de la API según el entorno (desarrollo, producción, etc.) sin tener que modificar el código.
  readonly apiUrl = environment.apiUrl + '/tasks';

  // Implementación de un método fetch para obtener los datos de la API REST utilizando la función fetch nativa de JavaScript.
  // Este método es asíncrono y devuelve una promesa que se resuelve con un array de Task.
  // Resuelve errores de la API REST comprobando el código de estado de la respuesta y lanzando un error si no es correcto.
  async getFetch() {
    const response = await fetch(this.apiUrl);
    // Comprobamos si la respuesta de la API es correcta (código de estado 200-299).
    // Si no lo es, lanzamos un error con el mensaje de error correspondiente.
    if (!response.ok) {
      throw new Error(`Error fetching tasks: ${response.statusText}`);
    }
    return response.json() as Promise<Task[]>;
  }

  // Implementamos los métodos de la interfaz StoreRx para interactuar con la API REST.
  // Cada método hace una petición HTTP correspondiente (GET, POST, PUT, PATCH, DELETE) a la URL de la API y devuelve un Observable con el resultado.
  // El método get() hace una petición GET a la URL de la API para obtener todos los elementos de tipo Task y devuelve un Observable con un array de Task.
  get(): Observable<Task[]> {
    return this.#httpClient.get<Task[]>(this.apiUrl);
  }
  // El método getById(id: string) hace una petición GET a la URL de la API concatenando el ID del elemento a obtener, y devuelve un Observable con el Task correspondiente.
  getById(id: string): Observable<Task> {
    return this.#httpClient.get<Task>(`${this.apiUrl}/${id}`);
  }
  // El método add(newItem: Omit<Task, 'id'>) hace una petición POST a la URL de la API con el nuevo elemento a añadir
  // (sin el ID, que será generado por la API), y devuelve un Observable con el Task creado.
  add(newItem: Omit<Task, 'id'>): Observable<Task> {
    return this.#httpClient.post<Task>(this.apiUrl, newItem);
  }
  // El método update(updatedItem: Task) hace una petición PUT a la URL de la API concatenando el ID del elemento a actualizar,
  // y enviando el objeto completo a actualizar, devolviendo un Observable con el Task actualizado.
  update(updatedItem: Task): Observable<Task> {
    // Usamos el método PUT para actualizar un recurso completo en la API REST.
    // La URL se construye concatenando la URL base de la API con el ID del elemento a actualizar.
    // El cuerpo de la petición contiene el objeto actualizado.
    return this.#httpClient.put<Task>(`${this.apiUrl}/${updatedItem.id}`, updatedItem);
  }
  // El método patch(id: string, pathData: Partial<Omit<Task, 'id'>>) hace una petición PATCH a la URL de la API concatenando el ID del elemento a actualizar,
  // y enviando los datos parciales a actualizar, devolviendo un Observable con el Task actualizado.
  patch?(id: string, pathData: Partial<Omit<Task, 'id'>>): Observable<Task> {
    return this.#httpClient.patch<Task>(`${this.apiUrl}/${id}`, pathData);
  }
  // El método delete(id: string) hace una petición DELETE a la URL de la API concatenando el ID del elemento a eliminar, y devuelve un Observable<void>.
  delete(id: string): Observable<void> {
    // return this.#httpClient.delete<void>(`${this.apiUrl}/${id}`);
    // Utilizamos pipe para transformar el Observable devuelto por HttpClient.delete y mapearlo a undefined, ya que no necesitamos el valor de retorno de la petición DELETE.
    const url = `${this.apiUrl}/${id}`;
    return this.#httpClient.delete<void>(url).pipe(map(() => undefined));
  }
}
