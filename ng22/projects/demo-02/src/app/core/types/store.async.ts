export interface StoreAsync<T extends { id: string }> {
  get(): Promise<T[]>;
  getById(id: T['id']): Promise<T>;
  add(newItem: Omit<T, 'id'>): Promise<T>;
  update(updatedItem: T): Promise<T>;
  patch?(id: T['id'], pathData: Partial<Omit<T, 'id'>>) : Promise<T>;
  delete(id: T['id']): Promise<void>;
}