import { UserModel } from './user.model';
import { Controller, Get, Param } from '@nestjs/common';
import { UserService } from './user.service';
import { Observable } from 'rxjs';


@Controller('users')
export class UserController {

    constructor(private userService: UserService) {
    }
    @Get('/test')
    getTest(): any {
        return this.userService.testMethod();
    }


    @Get('/hello')
    getHello(): string {
        return "Hello World";
    }
    @Get('/:id')
    getUser(@Param('id') id: number): UserModel {
        return this.userService.getUser(id);
    }

}
