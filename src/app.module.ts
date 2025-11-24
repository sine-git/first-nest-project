import { SignOptions } from './../node_modules/@types/jsonwebtoken/index.d';
/* eslint-disable prettier/prettier */
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { CvModule } from './cv/cv.module';
import { TodoModule } from './todo/todo.module';
import { SkillModule } from './skill/skill.module';
import { SkillFirstMiddleware } from './skill/middlewares/skill.first.middleware';
import { ConfigModule, ConfigService } from '@nestjs/config';
import configuration from '../src/configs/configurations';
import devConfiguration from './configs/configuration.dev';
import prodConfiguration from './configs/configuration.prod';
import * as dotenv from 'dotenv';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TodoEntity } from './todo/entities/todo.entity';
import { MulterModule } from '@nestjs/platform-express';
import { FileModule } from './file/file.module';
import { WebsocketGatewayServerModule } from './file/websocketgatewayserver/websocketgatewayserver.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { AuthModule } from './auth/auth.module';
import { AuthGuard, PassportModule } from '@nestjs/passport';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './auth/jwt/jwt-auth.guard';
import { RoleModule } from './role/role.module';
import { AuthorityModule } from './authority/authority.module';


dotenv.config()
@Module({
  imports: [UserModule, TodoModule, SkillModule, WebsocketGatewayServerModule,
    MulterModule.register({}),
    ConfigModule.forRoot({
      load: [process.env.ENV == 'DEV' ? devConfiguration : prodConfiguration],
      isGlobal: true
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public')
    }),
    /* TypeOrmModule.forRoot(
      {
        type: 'mysql',
        host: process.env.BD_HOST,
        port: Number(process.env.BD_PORT) || 3306,
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        synchronize: true,
        entities: []

      }
    ), */
    TypeOrmModule.forRootAsync(
      {
        inject: [ConfigService],
        useFactory: (config: ConfigService) => ({
          type: 'mysql',
          host: config.get('database.host'),
          port: Number(config.get('database.port')) || 3306,
          username: config.get('database.username'),
          password: config.get('database.password'),
          database: config.get('database.name'),
          synchronize: true,
          //entities: [TodoEntity]
          autoLoadEntities: true,
          cache: {
            duration: 5000
          }
        })
      }
    ),
    CvModule,
    FileModule,
    AuthModule,
    PassportModule.register({
      defaultStrategy: 'jwt'
    }),
    RoleModule,
    AuthorityModule,
  ],
  controllers: [AppController],
  providers: [
    /*   {
        provide: APP_FILTER,
        useClass: SkillExceptionFilter
      }, */
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard
    },
    AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(SkillFirstMiddleware).forRoutes('skill');
  }
}
