import { ExecutionContext, ForbiddenException, Injectable, UnauthorizedException } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { Observable } from "rxjs";
import { IS_PUBLIC_KEY, ROLES } from "./decorators";
import { Reflector } from "@nestjs/core";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {

    constructor(private reflector: Reflector,
        //private jwtService: JwtService,
        private configService: ConfigService) {
        super()
    }

    handleRequest(err: any, user: any, info: any, context: ExecutionContext, status?: any) {
        const payLoad = user
        console.log(`The payload is passed`)
        const requiredRoles = this.reflector.getAllAndOverride<string[]>(
            ROLES, [
            context.getHandler(),
            context.getClass()
        ])
        if (!requiredRoles?.includes(user.role)) {
            throw new ForbiddenException('Unauthorized to access this ressource...')
        }
        return user
    }
    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const isPublic = this.reflector.getAllAndOverride<boolean>(
            IS_PUBLIC_KEY, [
            context.getHandler(),
            context.getClass()
        ])
        if (isPublic)
            return true
        return super.canActivate(context)
    }
}