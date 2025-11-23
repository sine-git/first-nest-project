import { Injectable, NotFoundException } from '@nestjs/common';
import { AuthDto } from './dto/auth.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt'
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>
    , private jwtService: JwtService, private config: ConfigService) {
  }
  async authenticate(authDto: AuthDto) {
    const dbUser = await this.userRepository.findOneBy({
      username: authDto.username,
    })
    if (!dbUser)
      throw new NotFoundException('Invalid username or password !!')
    const hashedPassword = await bcrypt.hash(authDto.password, dbUser.salt)
    if (hashedPassword != dbUser.password)
      throw new NotFoundException('Invalid username or password !!')
    const payload = {
      username: dbUser.username,
      email: dbUser.email,
    }
    const secretKey = this.config.get('jwt.secret')
    const token = this.jwtService.sign(payload)
    return token;
  }
}
