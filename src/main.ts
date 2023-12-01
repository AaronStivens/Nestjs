import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import * as morgan from 'morgan';
import { cors } from './constants';
import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import { Server } from 'socket.io';
import * as colors from 'colors';
import * as session from 'express-session';


async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const reflector = app.get(Reflector);
  const { createServer } = require('node:http');
  const server = createServer(app);
  const io = new Server(server)

  app.use(session({ 
    secret: 'keyboard cat',
     cookie: { maxAge: 600000 //Tiempo de sesion establecido en 10 minutos
    }}))
  app.use(morgan("dev"))
  app.useGlobalInterceptors(new ClassSerializerInterceptor(reflector))
  app.enableCors(cors);
  app.setGlobalPrefix("api")
  app.useGlobalPipes(new ValidationPipe({transformOptions:{enableImplicitConversion:true}}));

  app.useStaticAssets(join(__dirname, '..', 'public'));
  app.setBaseViewsDir(join(__dirname, "../../views"));
  app.setViewEngine('hbs');

  io.on('connection', (socket) => {
    console.log(colors.green('Un usuario se ha conectado'));
  });

  const configService = app.get(ConfigService);
  await app.listen(configService.get("PORT"))
  console.log(`Aplication running on: ${await app.getUrl()}`)
}
bootstrap();
