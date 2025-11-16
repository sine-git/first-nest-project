import { PartialType } from "@nestjs/mapped-types";
import { TodoModel } from "./todo.model";

export class TotoTitle extends PartialType(TodoModel) {
}