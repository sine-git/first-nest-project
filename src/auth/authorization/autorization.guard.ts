import { ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';
import { CanActivate } from './../../../node_modules/@nestjs/common/interfaces/features/can-activate.interface.d';
import { AuthGuard } from "@nestjs/passport";
import { Reflector } from '@nestjs/core';

export class authorization extends AuthGuard('jwt') {

    constructor(private reflector: Reflector) {
        super()

    } canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {

        this.reflector.getAllAndOverride('roles', [
            context.getHandler(),
            context.getClass()
        ])
        const request = context.switchToHttp().getRequest()
        return true
    }


}