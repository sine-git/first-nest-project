import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { JwtStrategy } from './jwt/jwt-strategy';
import { JwtAuthGuard } from './jwt/jwt-auth.guard';

@Module({
  controllers: [AuthController],
  imports: [TypeOrmModule.forFeature([User]),
  JwtModule.registerAsync(
    {
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        secret: config.get('jwt.secret'),
        signOptions: {
          expiresIn: 3600
        }
      })
    }),
  ],
  providers: [AuthService, JwtStrategy],
})
export class AuthModule { }
