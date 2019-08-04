import { Injectable } from '@angular/core';
import { Todo } from '../modules/todo.module';
import { BehaviorSubject, Observable } from 'rxjs';
import { Filter } from '../modules/filtering.module';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  private static readonly TodoStorageKey = 'todos';

  private todos: Todo[];
  private filterTodo: Todo[];
  private lengthSubject: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  private displayTodosSubject: BehaviorSubject<Todo[]> = new BehaviorSubject<Todo[]>([]);
  private currentFilter: Filter = Filter.All;

  todos$: Observable<Todo[]> = this.displayTodosSubject.asObservable();
  length$: Observable<number> = this.lengthSubject.asObservable();

  constructor(private storageService: LocalStorageService ) {}

  fetchFromLocalStorage() {
    this.todos = this.storageService.getValue<Todo[]>(TodoService.TodoStorageKey) || [];
  }
}
