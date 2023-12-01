import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import {ConfigModule} from "@nestjs/config"
import { datasourceconfig } from './config/data.source';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProjectsModule } from './projects/projects.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
    envFilePath: "process.env",
    isGlobal: true
  }),

  TypeOrmModule.forRoot(datasourceconfig),
  UsersModule,
  ProjectsModule,
  AuthModule,
  ],
  controllers: []
})
export class AppModule {}
