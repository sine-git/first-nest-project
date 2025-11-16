import { IsEnum, IsNumber, IsString } from 'class-validator';
import { TodoStatus } from '../enum/todo-status';
export class TodoPageDto {
    //@IsNumber()
    page: number
    //@IsNumber()
    count: number
}