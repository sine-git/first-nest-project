import { ConfigSetFromMetaSet } from './../../node_modules/jackspeak/dist/commonjs/index.d';
import { Body, Delete, Injectable, InternalServerErrorException, NotFoundException, Param, Post, Put, UsePipes, ValidationPipe } from '@nestjs/common';
import { TodoModel } from './todo.model';

import { TodoCreationDto } from './dtos/todo.creation.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { In, LessThan, Like, Repository } from 'typeorm';
import { TodoEntity } from './entities/todo.entity';
import { TodoUpdateDto } from './dtos/todo.update.dto';
import { TodoStatus } from './enum/todo-status';
import { TodoFindDto } from './dtos/todo.find.dto';


@Injectable()
export class TodoService {
    async findByIds(ids: number[]) {
        return await this.todoRepository.findBy({ id: In(ids) });
    }

    todos: TodoModel[] = [];
    currentId: number = 1;
    constructor(
        @InjectRepository(TodoEntity) private readonly todoRepository: Repository<TodoEntity>
    ) {

    }
    async test() {
        /* const result = await
            this.todoRepository.find({
                select: ["id", "createdAt", "title", "userId"]
                // , where: { "id": 2, "title": "New" }
            },
            ) */
        /*         const result = await this.todoRepository.find(
                    {
                        where: {
                            users: LessThan(10)
                        }
                    }
                ) */

        const result = await this.todoRepository.find({
            where: {
                "title": Like("%Todo%")
            }
        })
        return result
    }
    getTodos(): TodoModel[] {
        return this.todos
    }
    async getTodos2(): Promise<TodoCreationDto[]> {
        const result = await this.todoRepository.find()
        const todos = result.map(todo => todo as TodoCreationDto)
        return todos

    }
    getTodo(id: number) {

    }

    async find(todoFindDto: TodoFindDto) {

        const result = await this.todoRepository.find({
            where: [
                {
                    status: todoFindDto.status
                },
               /*  {
                title: Like(`%${todoFindDto.value}%`), status: todoFindDto.status
            }, {
                description: Like(`%${todoFindDto.value}%`), status: todoFindDto.status
            } */]
        })
        return result
    }

    async findAndCount(condition: any) {
        const result = await this.todoRepository.findAndCount({
            where: condition
        })
        return result
    }
    async addTodo(todo: TodoCreationDto) {
        const createdTodo = await this.todoRepository.save(todo)
        return createdTodo
    }
    async updateTodo(todo: TodoUpdateDto) {
        const mergedTodo = await this.todoRepository.preload(todo)
        if (!mergedTodo) {
            return new NotFoundException('')
        }
        const updatedTodo = await this.todoRepository.save(mergedTodo)
        return updatedTodo
    }
    async updateWithConditions(conditions: any) {
        const result = await this.todoRepository.update(conditions.criteria, conditions.values);
        return
    }
    async deleteTodo(id: number) {
        const result = await this.todoRepository.delete(id)

        if (result.affected === 0)
            throw new NotFoundException('Todo introuvable')
    }
    async softDeleteTodo(id: number) {
        const result = await this.todoRepository.softDelete(id)
        if (result.affected === 0)
            throw new NotFoundException('Todo introuvable')
    }
    async restoreTodo(id: number) {
        const result = await this.todoRepository.restore(id)
        if (result.affected === 0)
            throw new NotFoundException('Todo introuvable')
    }

    async count() {
        return await this.todoRepository.count()
    }

    async countNames(name: string) {
        return await this.todoRepository.count({ where: { title: name } });
    }

    async incrementUsers(value: number, title: string) {
        return await this.todoRepository.increment({ title: title }, 'users', value)
    }
}
