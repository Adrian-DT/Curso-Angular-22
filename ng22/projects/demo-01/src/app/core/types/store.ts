// Interfaz genérica para un almacén de datos (store) que maneja elementos de tipo T,
// donde T debe tener una propiedad 'id' de tipo string. Esta interfaz define
// los métodos que cualquier implementación de un almacén de datos debe proporcionar,
// incluyendo obtener todos los elementos, obtener un elemento por su id, añadir un
// nuevo elemento, actualizar un elemento existente, aplicar cambios parciales a un
// elemento y eliminar un elemento por su id.
export interface Store<T extends {id: string}> {
  get(): T[];
  getById(id: T['id']): T;
  add(newItem: Omit<T, 'id'>): T;
  update(updateItem: T): T;
  patch?(id: T['id'], partialItem: Partial<Omit<T, 'id'>>): T ;
  delete(id: T['id']): void;
}
