// Interfaz genérica para un almacén de datos (store) que maneja elementos de tipo T,
// donde T debe tener una propiedad 'id' de tipo string. Esta interfaz define
// los métodos que cualquier implementación de un almacén de datos debe proporcionar,
// incluyendo obtener todos los elementos, obtener un elemento por su id, añadir un
// nuevo elemento, actualizar un elemento existente, aplicar cambios parciales a un
// elemento y eliminar un elemento por su id.
export interface StoreAsync<T extends {id: string}> {
  get(): Promise<T[]>;
  getById(id: T['id']): Promise<T>;
  add(newItem: Omit<T, 'id'>): Promise<T>;
  update(updateItem: T): Promise<T>;
  patch?(id: T['id'], partialItem: Partial<Omit<T, 'id'>>): Promise<T>;
  delete(id: T['id']): Promise<void>;
}
