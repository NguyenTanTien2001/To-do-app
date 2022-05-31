import { Component, ElementRef, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { TodoInterface } from 'src/app/todos/model/todo.model';
import { TodoService } from 'src/app/todos/services/todo.services';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
})
export class TodoItemComponent implements OnInit, OnChanges {
  @Input('todo') todoProp: TodoInterface;
  @Input('isEditing') isEditingProp: boolean;
  @Output('setEditingId') setEditingIdEvent: EventEmitter<string | null> = new EventEmitter();

  editingText: string = '';

  @ViewChild('textInput') textInput:ElementRef;

  constructor(private todoService: TodoService) { }

  ngOnInit(): void {
    this.editingText = this.todoProp.title;
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log('change', changes);
    if(changes['isEditingProp'].currentValue) {
      setTimeout(() => {
        this.textInput.nativeElement.focus();
      }, 0);
    }
  }

  setTodoInEditMode(): void {
    console.log('set todo in edit mode')
    this.setEditingIdEvent.emit(this.todoProp.id)
  }

  removeTodo(): void {
    console.log('remove todo');
    this.todoService.removeTodo(this.todoProp.id);
  }

  toggleTodo(): void {
    this.todoService.toggleTodo(this.todoProp.id);
    console.log('toggle todo ', this.todoProp.title, " to ", this.todoProp.isCompleted);

  }

  changeText(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.editingText = target.value;
  }

  changeTodo(): void {
    console.log('change toto to:', this.editingText);
    this.todoService.changeTodo(this.todoProp.id, this.editingText);
    this.setEditingIdEvent.emit(null);
  }

}
