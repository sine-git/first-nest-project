import { PassportStrategy } from "@nestjs/passport";
import { InjectRepository } from "@nestjs/typeorm";
import { ExtractJwt, Strategy } from "passport-jwt";
import { User } from "src/user/entities/user.entity";
import { Repository } from "typeorm";
import { ConfigService } from '@nestjs/config';
import { JwtPayload } from "./jwt-payload";
import { Injectable, UnauthorizedException } from "@nestjs/common";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(@InjectRepository(User) private userRepository: Repository<User>, config: ConfigService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: config.get('jwt.secret')
        })
    }
    async validate(payLoad: JwtPayload) {
        console.log(`The user payload is ${payLoad}`)
        const user = this.userRepository.findOneBy({
            username: payLoad.username
        })

        if (!user)
            throw new UnauthorizedException()
        return user
    }

}