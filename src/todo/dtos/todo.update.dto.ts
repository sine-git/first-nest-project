import { IsBoolean, IsNumber, IsOptional, IsString } from "class-validator"

export class TodoUpdateDto {
    @IsNumber()
    public userId: number
    @IsString()
    public title: string
    @IsBoolean()
    public completed: boolean
    @IsNumber()
    @IsOptional()
    public id?: number
    constructor(userId: number, title: string, completed: boolean, id?: number) {
        this.userId = userId
        this.title = title
        this.completed = completed
        this.id = id
    }
}