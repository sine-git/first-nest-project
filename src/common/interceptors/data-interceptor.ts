import { CallHandler, ExecutionContext, NestInterceptor } from "@nestjs/common";
import { Observable } from "rxjs";
import { map, tap } from 'rxjs/operators';
import { Response } from 'express'

export class DataInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> | Promise<Observable<any>> {

        const response = context.switchToHttp().getResponse<Response>()

        return next.handle().pipe(map((data) => {
            return { data }
        }))
    }

}