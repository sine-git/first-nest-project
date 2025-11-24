import { PassportStrategy } from "@nestjs/passport";
import { InjectRepository } from "@nestjs/typeorm";
import { ExtractJwt, Strategy } from "passport-jwt";
import { User } from "src/user/entities/user.entity";
import { Repository } from "typeorm";
import { ConfigService } from '@nestjs/config';
import { JwtPayload } from "./jwt-payload";
import { Injectable, UnauthorizedException } from "@nestjs/common";
import { Reflector } from "@nestjs/core";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(@InjectRepository(User) private userRepository: Repository<User>, config: ConfigService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: config.get('jwt.secret')
        })
    }
    async validate(payLoad: JwtPayload) {
        //console.log(`The user payload is ${payLoad}`)
        const dbUser = await this.userRepository.findOneBy({
            username: payLoad.username,
        })
        if (!dbUser)
            throw new UnauthorizedException('Invalid token for user!!')
        const user = {}
        Object.assign(user, {
            username: dbUser.username,
            role: dbUser.role.key
        })
        return user;
    }

}