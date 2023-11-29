import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import * as morgan from 'morgan';
import { cors } from './constants';
import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const reflector = app.get(Reflector);
  app.use(morgan("dev"))
  app.useGlobalInterceptors(new ClassSerializerInterceptor(reflector))
  app.enableCors(cors);
  app.setGlobalPrefix("api")
  app.useGlobalPipes(new ValidationPipe({transformOptions:{enableImplicitConversion:true}}));

  app.useStaticAssets(join(__dirname, '..', 'public'));
  app.setBaseViewsDir(join(__dirname, "../../views"));
  app.setViewEngine('hbs');
  
  const configService = app.get(ConfigService);
  await app.listen(configService.get("PORT"))
  console.log(`Aplication running on: ${await app.getUrl()}`)
}
bootstrap();
