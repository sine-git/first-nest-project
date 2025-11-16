import { PartialType, PickType } from "@nestjs/mapped-types";
import { TodoModel } from "./todo.model";
import { TodoEntity } from "./entities/todo.entity";
import { TodoStatus } from "./enum/todo-status";

export class TodoCreateDto extends PickType(TodoEntity, ["userId", "completed", "status", "users"]) {
    constructor(userId: number, completed: boolean, status: TodoStatus, users: number) {
        super()
        this.userId = userId;
        this.completed = completed;
        this.status = status;
        this.users = users

    }
}