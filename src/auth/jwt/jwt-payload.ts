import { PickType } from "@nestjs/mapped-types";
import { User } from "src/user/entities/user.entity";

export class JwtPayload extends PickType(User, ['username', 'email', 'role']) {

}