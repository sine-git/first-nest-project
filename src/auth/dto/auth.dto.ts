import { PartialType, PickType } from "@nestjs/mapped-types";
import { User } from "src/user/entities/user.entity";

export class AuthDto extends PickType(User, ['username', 'password']) { }
