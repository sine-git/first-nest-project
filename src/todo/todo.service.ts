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
import { TodoPageDto } from './dtos/todo.page.dto';


@Injectable()
export class TodoService {


    constructor(
        @InjectRepository(TodoEntity) private readonly todoRepository: Repository<TodoEntity>
    ) {

    }

    todos: TodoModel[] = [];
    currentId: number = 1;
    async findByIds(ids: number[]) {
        return await this.todoRepository.findBy({ id: In(ids) });
    }

    countByStatus() {
        const queryBuilder = this.todoRepository.createQueryBuilder('todo')
        queryBuilder.select(['count(todo.id) as number', 'todo.status']).groupBy('todo.status')
        return queryBuilder.getRawMany()
    }
    queryBuilder() {

        /* const results = this.todoRepository.createQueryBuilder('todo').getMany()
        return results */
        const queryBuilder = this.todoRepository.createQueryBuilder('todo')
            .select(['todo.id', 'todo.title', 'todo.status'])
            //.where('id=:id', { id: 3 }).setParameters('', 4)
            //.where('id=:id').setParameters({ id: 3 })
            .where('id IN (:...ids)', { ids: [3, 2, 5] })
        return queryBuilder.getMany()


    }
    async query() {
        const result = await this.todoRepository.query('select * from todo');
        return result;
    }
    async findOne(id: number) {
        const result =
            await this.todoRepository.findOne(
                {
                    where: {
                        id: id
                    }
                }
            );
        if (!result)
            throw new NotFoundException(`Impossible to find Todo with id ${id}`)
        return result
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
    async find2(todoFindDto: TodoFindDto) {

        const queryBuilder = this.todoRepository.createQueryBuilder('todo')
        queryBuilder.where(
            'title LIKE :value', { value: `%${todoFindDto.value}%` }
        ).orWhere('description LIKE :value', { value: `%${todoFindDto.value}%` })
            .andWhere('status = :status', { status: todoFindDto.status }).orderBy('id', 'DESC')
        const result = queryBuilder.getMany()
        return result
    }
    async findPage(todoPageDto: TodoPageDto) {
        const queryBuilder = this.todoRepository.createQueryBuilder('todo')
        queryBuilder.take(todoPageDto.count).skip((todoPageDto.page - 1) * todoPageDto.count)
        const result = queryBuilder.getMany()
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
