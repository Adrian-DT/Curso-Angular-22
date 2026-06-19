import { Observable } from 'rxjs';

// Interfaz genérica para un almacén de datos (store) que maneja elementos de tipo T,
// donde T debe tener una propiedad 'id' de tipo string. Esta interfaz define
// los métodos que cualquier implementación de un almacén de datos debe proporcionar,
// incluyendo obtener todos los elementos, obtener un elemento por su id, añadir un
// nuevo elemento, actualizar un elemento existente, aplicar cambios parciales a un
// elemento y eliminar un elemento por su id.
export interface StoreObservable<T extends {id: string}> {
  get(): Observable<T[]>;
  getById(id: T['id']): Observable<T>;
  add(newItem: Omit<T, 'id'>): Observable<T>;
  update(updateItem: T): Observable<T>;
  patch?(id: T['id'], partialItem: Partial<Omit<T, 'id'>>): Observable<T>;
  delete(id: T['id']): Observable<void>;
}
