/* eslint-disable prettier/prettier */
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe, VersioningType } from '@nestjs/common';

import * as morgan from 'morgan'
import { RequestDurationInterceptor } from './skill/interceptors/skill-request-duration.interceptor';
import { DataInterceptor } from './common/interceptors/data-interceptor';
import * as dotenv from 'dotenv'
dotenv.config()
async function bootstrap() {

  const app = await NestFactory.create(AppModule);
  const coresOption = {
    origin: [
      'http://localhost:4200'
    ]
  }
  app.useGlobalPipes(new ValidationPipe({
    // eslint-disable-next-line prettier/prettier
    //transform: true, 
    forbidNonWhitelisted: true
  }))
  //app.useGlobalInterceptors(new DataInterceptor())
  app.enableCors(coresOption)
  app.use(morgan('dev'))
  app.enableVersioning(
    { type: VersioningType.URI }
  )
  console.log(`Application port is ${process.env.PROJECT_PORT}`)
  await app.listen(process.env.SERVER_PORT);
}
bootstrap();
