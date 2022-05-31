import { Component, OnInit } from '@angular/core';
import { map, Observable } from 'rxjs';
import { combineLatest } from 'rxjs/internal/observable/combineLatest';
import { TodoInterface } from 'src/app/todos/model/todo.model';
import { TodoService, FilterEnum } from 'src/app/todos/services/todo.services';

@Component({
  selector: 'app-todos-list',
  templateUrl: './todo-list.component.html',
})
export class TodosListComponent implements OnInit {
  visibleTodo$: Observable<TodoInterface[]>;
  noTodoClass$: Observable<boolean>;
  isAllTodoSelected$: Observable<boolean>;

  constructor(private todoService: TodoService) {
    this.isAllTodoSelected$ = this.todoService.todo$.pipe(map((todos) => todos.every(todo => todo.isCompleted)));
    this.noTodoClass$ = this.todoService.todo$.pipe(map((todos) => todos.length === 0));
    this.visibleTodo$ = combineLatest(this.todoService.todo$, this.todoService.filter$).pipe(map(([todos, filter]: [TodoInterface[], FilterEnum]) => {
      if(filter === FilterEnum.active) {
        return todos.filter((todo) => !todo.isCompleted)
      } else if (filter === FilterEnum.completed) {
        return todos.filter((todo) => todo.isCompleted)
      }
      return todos;
    }))
   }

  ngOnInit(): void {
  }

  toggleAllTodos(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.todoService.toggleAll(target.checked);
  }

}
