import { Observable } from "rxjs";

export interface StoreRx<T extends { id: string }> {
  get(): Observable<T[]>;
  getById(id: T['id']): Observable<T>;
  add(newItem: Omit<T, 'id'>): Observable<T>;
  update(updatedItem: T): Observable<T>;
  patch?(id: T['id'], pathData: Partial<Omit<T, 'id'>>) : Observable<T>;
  delete(id: T['id']): Observable<void>;
}