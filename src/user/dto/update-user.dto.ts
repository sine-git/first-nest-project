import { OmitType, PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { User } from '../entities/user.entity';

export class UpdateUserDto extends OmitType(User, ['cvs']) {
    cvsIds: string[]
    constructor(cvsIds: string[]) {
        super()
        this.cvsIds = cvsIds
    }
}
