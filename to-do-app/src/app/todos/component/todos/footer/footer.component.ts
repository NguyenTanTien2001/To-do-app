import { Component, OnInit } from '@angular/core';
import { map, Observable } from 'rxjs';
import { FilterEnum, TodoService } from 'src/app/todos/services/todo.services';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
})
export class FooterComponent implements OnInit {
  noTodoClass$: Observable<boolean>;
  activeCount$: Observable<number>;
  itemLeftText$: Observable<string>;
  filter$: Observable<FilterEnum>;

  filterEnum = FilterEnum;

  constructor(private todoService: TodoService) {
    this.activeCount$ = this.todoService.todo$.pipe(map((todos => todos.filter((todo) => !todo.isCompleted).length)))
    this.itemLeftText$ = this.activeCount$.pipe(map((activeCount) => `item${activeCount !== 1 ? 's' : ''} left`))
    this.noTodoClass$ = this.todoService.todo$.pipe(map((todos) => todos.length === 0));
    this.filter$ = this.todoService.filter$
  }

  ngOnInit(): void {
  }

  changeFilter(event: Event, filter: FilterEnum): void {
    event.preventDefault();
    this.todoService.changeFilter(filter);
  }

}
