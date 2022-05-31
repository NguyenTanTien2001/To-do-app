import { Component, OnInit } from '@angular/core';
import { TodoService } from 'src/app/todos/services/todo.services';

@Component({
  selector: 'app-todos-header',
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit {

  text: string = '';

  constructor(private todoService: TodoService) {
    this.todoService.todo$.subscribe((todo) => {console.log(todo)});
   }

  ngOnInit(): void {
  }

  changeText(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.text = target.value;
  }

  addToDo(): void {
    this.todoService.addTodo(this.text);
    this.text = '';
  }

}
