/* eslint-disable prettier/prettier */
import { NestMiddleware } from "@nestjs/common";
import { skillLoggerMiddleware } from "./skill.logger.middleware";

export class SkillFirstMiddleware implements NestMiddleware {
    use(req: any, res: any, next: (error?: Error | any) => void) {
        //        console.log(req)
        skillLoggerMiddleware(req, res, next);
    }
}