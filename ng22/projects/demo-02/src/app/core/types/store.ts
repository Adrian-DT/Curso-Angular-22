export interface Store<T extends { id: string }> {
  get(): T[];
  getById(id: T['id']): T;
  add(newItem: Omit<T, 'id'>): T;
  update(updatedItem: T): T;
  patch?(id: T['id'], pathData: Partial<Omit<T, 'id'>>) : T;
  delete(id: T['id']): void;
}