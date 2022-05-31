import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TodosComponent } from 'src/app/todos/component/todos/todos.component';
import { RouterModule, Routes } from '@angular/router';
import { HeaderComponent } from 'src/app/todos/component/todos/header/header.component';
import { TodoService } from './services/todo.services';
import { TodosListComponent } from './component/todos/todo-list/todo-list.component';
import { TodoItemComponent } from './component/todos/todo-item/todo-item.component';
import { FooterComponent } from './component/todos/footer/footer.component';

const routes: Routes = [
  {
    path: '',
    component: TodosComponent,
  }
]

@NgModule({
  declarations: [
    TodosComponent,
    HeaderComponent,
    TodosListComponent,
    TodoItemComponent,
    FooterComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  providers: [TodoService],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class TodosModule { }
