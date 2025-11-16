import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class RequestDurationInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        console.log("Before handling request...")
        const start = Date.now()
        const request = context.switchToHttp().getRequest()
        return next.handle().pipe(
            tap(() => {
                const end = Date.now()
                console.log(`After ${start - end} ms`)
            })
        )
    }
}
