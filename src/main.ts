import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { cors } from './constants';
import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import * as session from 'express-session';
import * as morgan from 'morgan';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const reflector = app.get(Reflector);
  
  app.use(session({ 
    secret: 'keyboard cat',//Clave secreta
     cookie: { maxAge: 600000 //Tiempo de sesion establecido en 10 minutos
    }}))
  app.use(morgan("dev"))//Habilitar morgan para ver las solicitudes realizadas
  app.useGlobalInterceptors(new ClassSerializerInterceptor(reflector))
  app.enableCors(cors);//Habilitar cors
  app.setGlobalPrefix("api")//Habilitar "api" para las pruebas del proyecto
  app.useGlobalPipes(new ValidationPipe({transformOptions:{enableImplicitConversion:true}}));
  app.useStaticAssets(join(__dirname, '..', 'public'));//Motor hbs
  app.setBaseViewsDir(join(__dirname, "../../views"));//Motor hbs
  app.setViewEngine('hbs')//Motor hbs

  const configService = app.get(ConfigService);
  await app.listen(configService.get("PORT"))
  console.log(`Proyecto corriendo en: ${await app.getUrl()}`)
}
bootstrap();
