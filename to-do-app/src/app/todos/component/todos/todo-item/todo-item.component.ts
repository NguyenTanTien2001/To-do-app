import { Component, Input, OnInit } from '@angular/core';
import { TodoInterface } from 'src/app/todos/model/todo.model';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
})
export class TodoItemComponent implements OnInit {
  @Input('todo') todoProp: TodoInterface;
  constructor() { }

  ngOnInit(): void {
  }

}
