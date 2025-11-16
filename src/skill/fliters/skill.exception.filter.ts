/* eslint-disable prettier/prettier */
import { ArgumentsHost, Catch, ExceptionFilter, HttpException } from "@nestjs/common";
import { Request, Response } from "express";


@Catch(HttpException)
export class SkillExceptionFilter implements ExceptionFilter {
    catch(exception: HttpException, host: ArgumentsHost) {
        const ctx = host.switchToHttp()
        const request = ctx.getRequest<Request>()
        const response = ctx.getResponse<Response>()
        const exceptionResponse = exception.getResponse()
        response.status(exception.getStatus()).json({
            message: 'custom response',
            statusCode: exception.getStatus(),
            timestamp: new Date().toISOString(),
            path: request.url
        })
        return response;
    }

}