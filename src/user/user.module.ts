
import { HttpModule } from '@nestjs/axios';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { Module } from '@nestjs/common';

@Module({
    controllers: [UserController],
    providers: [UserService],
    imports: [HttpModule]
})
export class UserModule { }
