import { Body, Controller, Delete, Get, HttpStatus, NotFoundException, Param, ParseIntPipe, Post, Put, Query, Version } from '@nestjs/common';
import { TodoModel } from './todo.model';
import { throws } from 'assert';
import { TodoService } from './todo.service';
import { TodoCreationDto } from './dtos/todo.creation.dto';
import { FusionPipe } from './pipes/fusion-pipe';

import { TodoCreateDto } from './todo.dto';
import { TodoUpdateDto } from './dtos/todo.update.dto';
import { TodoStatus } from './enum/todo-status';
import { isEnum } from 'class-validator';
import { TodoFindDto } from './dtos/todo.find.dto';
import { TodoPageDto } from './dtos/todo.page.dto';

@Controller({
    path: 'todo',
    //version: '1'

})
export class TodoController {
    constructor(private todoService: TodoService) {
    }
    @Get('/count-by-status')
    countByStatus() {
        return this.todoService.countByStatus()
    }
    @Get('/query')
    queryTodo() {
        return this.todoService.query()
    }

    @Get('/query-builder')
    queryBuilder() {
        return this.todoService.queryBuilder()
    }
    @Get('/test-find')
    testTodo() {
        return this.todoService.test()
    }
    @Get('/find-one/:id')
    findOne(id: number) {
        return this.todoService.findOne(id)
    }
    @Get('/find')
    findTodo(@Query() todoFindDto: TodoFindDto) {
        return this.todoService.find(todoFindDto)
    }
    @Get('/find')
    @Version('2')
    findTodo2(@Query() todoFindDto: TodoFindDto) {
        return this.todoService.find2(todoFindDto)
    }
    @Get('/find-page')
    findPage(@Query() todoPageDto: TodoPageDto) {
        return this.todoService.findPage(todoPageDto)
    }
    @Get('/find-and-count')
    findAndCount(@Body() condition: any) {
        return this.todoService.findAndCount(condition)
    }
    @Get('find-by-ids')
    findByIds(@Body() ids: number[]) {
        return this.todoService.findByIds(ids)
    }
    @Get()
    getTodos(): TodoModel[] {
        return this.todoService.getTodos()
    }
    @Get()
    @Version('2')
    getTodos2(): Promise<TodoCreationDto[]> {
        return this.todoService.getTodos2()
    }
    @Get('/count')
    count() {
        return this.todoService.count()
    }
    @Get('/count-names')
    countNames(@Query('name') name: string) {
        return this.todoService.countNames(name)
    }
    @Get(':id')
    getTodo(@Param('id', new FusionPipe()
        //    new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE })
    ) id: number)
    //: TodoModel
    {
        //return this.todoService.getTodo(id)
    }

    @Post('/add')
    @Version('1')
    addTodo2(@Body() todo: TodoCreationDto) {
        return {
            userId: 10,
            title: 'New task',
            completed: true,
            id: 1,
            description: 'This is the new task to be done tomorrow',
            status: 0,
            createdAt: '2025-11-15T23:43:53.342Z',
            udpatedAt: '2025-11-15T23:43:53.342Z',
            deletedAt: null,
            version: 1
        };
    }

    @Post('/add')
    @Version('2')
    addTodo(@Body() todo: TodoCreationDto) {
        return this.todoService.addTodo(todo);
    }
    @Put('/update')
    @Version('1')
    updateTodo(@Body() todo: TodoModel)
    //: TodoModel 
    {
        //return this.todoService.updateTodo(todo)
    }
    @Put('/update')
    @Version('2')
    updateTodo2(@Body() todo: TodoUpdateDto)
    //: TodoModel 
    {
        return this.todoService.updateTodo(todo)
    }

    @Post('/update-with-condition')
    udpateWithConditions(@Body() conditions: any) {
        return this.todoService.updateWithConditions(conditions)
    }
    @Delete('/delete/:id')
    deleteTodo(@Param() id: number) {
        return this.todoService.deleteTodo(id);
    }
    @Delete('/delete/:id')
    @Version('2')
    softDeleteTodo(@Param() id: number) {
        return this.todoService.softDeleteTodo(id);
    }
    @Put('/restore/:id')
    restoreTodo(@Param() id: number) {
        return this.todoService.restoreTodo(id);
    }

    @Post('increment-users')
    increment(@Query('value') value: number, @Query('title') title: string) {
        return this.todoService.incrementUsers(value, title);
    }


}
