import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { TodoInterface } from "src/app/todos/model/todo.model";

export enum FilterEnum {
  all = 'all',
  active = 'active',
  completed = 'completed',
}

Injectable()
export class TodoService{
  todo$ = new BehaviorSubject<TodoInterface[]>([]);
  filter$ = new BehaviorSubject<FilterEnum>(FilterEnum.all);

  addTodo(text: string): void {
    const newTodo: TodoInterface = {
      title: text,
      isCompleted: false,
      createDate: Date.now().toString(),
      id: Math.random().toString(16)
    }
    const updateTodo = [...this.todo$.getValue(), newTodo]
    this.todo$.next(updateTodo)
  }

  toggleAll(isCompleted: boolean): void {
    const updateTodos = this.todo$.getValue().map(todo => {
      return {
        ...todo,
        isCompleted,
      };
    })
    this.todo$.next(updateTodos);
  }

  changeFilter(filter: FilterEnum): void {
    this.filter$.next(filter);
  }
}
