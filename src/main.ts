import 'reflect-metadata';
import { ValidationPipe } from '@nestjs/common/pipes';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  //swagger config
  const config = new DocumentBuilder()
    .setTitle('Nest Authentication')
    .setDescription(
      'nest authentication, user management, role management,permissions,account settings',
    )
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  // somewhere in your initialization file
  app.use(cookieParser());
  //validator config
  // Use Global Pipes
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));

  await app.listen(3000);
}
bootstrap();
