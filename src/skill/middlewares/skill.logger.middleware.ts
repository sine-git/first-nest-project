/* eslint-disable prettier/prettier */
import { Request, Response } from 'express';
export function skillLoggerMiddleware(req: Request, resp: Response, next: () => void) {
    next()
}