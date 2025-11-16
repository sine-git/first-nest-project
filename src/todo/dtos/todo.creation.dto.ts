import { IsBoolean, IsNotEmpty, IsNumber, IsOptional, IsString, MaxLength, MinLength } from "class-validator"
import { TodoStatus } from "../enum/todo-status"
import { PartialType } from "@nestjs/mapped-types"
import { TodoEntity } from "../entities/todo.entity"

export class TodoCreationDto extends PartialType(TodoEntity) {
    /*   @IsNumber()
      public userId: number
      @IsString()
      @MinLength(3, { message: "La titre doit être d'au minimum 3 lettres" })
      @MaxLength(10, { message: "Le titre doit être d'au maximum 10 lettres" })
      public title: string
      @IsString()
      @IsNotEmpty()
      @MinLength(10, { message: "La description doit être d'au minimum 10 lettres" })
      public description: string
      @IsBoolean()
      public completed: boolean
      @IsNumber()
      @IsOptional()
      status: TodoStatus
      createdAt: Date
      udpatedAt: Date
      deletedAt: Date
      version: number
      users: number
  
      public id?: number
      constructor(userId: number, title: string, completed: boolean, id?: number) {
          this.userId = userId
          this.title = title
          this.completed = completed
          this.id = id
      } */
    constructor() {
        super()
    }
}