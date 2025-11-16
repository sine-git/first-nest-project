import { IsEnum, IsString } from 'class-validator';
import { TodoStatus } from '../enum/todo-status';
export class TodoFindDto {
    @IsString()
    value: string

    @IsEnum(TodoStatus)
    status: TodoStatus
}