import { ArgumentsHost, Catch, ExceptionFilter, HttpException } from "@nestjs/common";
import { Request, Response } from 'express'
@Catch(HttpException)
export class SkillCustomExceptionFilter implements ExceptionFilter {
    catch(exception: HttpException, host: ArgumentsHost) {
        const ctx = host.switchToHttp()
        const response = ctx.getResponse<Response>();
        const exceptionResponse = exception.getResponse()
        response.status(exception.getStatus()).json({
            status: exception.getStatus(),
            date: (new Date()).toISOString(),
            message: `Le message d'erreur est ${exception.message}`
        })
        return response;
    }

}