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

  changeTodo(id: string, title: string): void {
    const updateTodos = this.todo$.getValue().map(todo => {
      if(todo.id === id) {
        return {
          ...todo,
          title,
        }
      }
      return todo;
    })
    this.todo$.next(updateTodos);
  }

  removeTodo(id: string): void {
    const updateTodo = this.todo$.getValue().filter(todo => todo.id !== id);
    this.todo$.next(updateTodo);
  }

  toggleTodo(id: string): void {
    const updateTodos = this.todo$.getValue().map(todo => {
      if(todo.id === id) {
        return {
          ...todo,
          isCompleted: !todo.isCompleted,
        }
      }
      return todo;
    })
    this.todo$.next(updateTodos);
  }
}
