import { ConfigSetFromMetaSet } from 'jackspeak';
import { Body, Delete, Injectable, NotFoundException, Param, Post, Put, UsePipes, ValidationPipe } from '@nestjs/common';
import { TodoModel } from './todo.model';
//import { TodoIdDto } from './todo-id.dto';
import { TodoCreationDto } from './dtos/todo.creation.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TodoEntity } from './entities/todo.entity';

@Injectable()
export class TodoService {
    constructor(
        @InjectRepository(TodoEntity) private readonly todoRepository: Repository<TodoEntity>
    ) {

    }
    test() {
        /*  const todoId: TodoIdDto = new TodoIdDto(1)
         const todo: TodoModel = new TodoModel(0, "Title", true, 1)
         return todoId; */

    }

    todos: TodoModel[] = [];
    currentId: number = 1;

    getTodos(): TodoModel[] {
        this.todos;
        return this.todos
    }
    getTodo(id: number): TodoModel {
        const existingTodo = this.todos.find((existingTodo) =>
            existingTodo.id == id
        )
        if (
            !existingTodo) {
            throw new NotFoundException("Cet utilisateur n'existe pas");
        }
        return existingTodo
    }
    @UsePipes(ValidationPipe)
    addTodo(@Body() todo: TodoCreationDto): TodoCreationDto {
        todo.id = this.currentId
        this.currentId++
        //this.todos.push(todo)
        return todo

    }
    updateTodo(@Body() todo: TodoModel): TodoModel {
        const existingTodo = this.todos.find((existingTodo) =>
            existingTodo.id == todo.id
        )
        if (
            !existingTodo) {
            throw new NotFoundException("Cet utilisateur n'existe pas");
        }
        const index = this.todos.indexOf(existingTodo)
        this.todos[index] = todo
        return todo

    }
    deleteTodo(@Param() id: number): TodoModel {
        const existingTodo = this.todos.find((todo) =>
            todo.id == id
        )
        if (
            !existingTodo) {
            throw new NotFoundException("Cet utilisateur n'existe pas");
        }
        const index = this.todos.indexOf(existingTodo)
        this.todos.slice(index);
        return existingTodo
    }
}
