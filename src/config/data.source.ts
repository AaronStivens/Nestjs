import { ConfigModule, ConfigService } from "@nestjs/config";
import { DataSourceOptions,DataSource } from "typeorm";
import { SnakeNamingStrategy } from "typeorm-naming-strategies";

ConfigModule.forRoot({
    envFilePath: ".env"
  })

const configService =  new ConfigService()

export const  datasourceconfig:DataSourceOptions = {
    type:"mysql",
    host:configService.get(`DB_HOST`),
    port:configService.get(`DB_PORT`),
    username:configService.get(`DB_USER`),
    password:"",
    database:configService.get(`DB_NAME`),
    entities:[__dirname + `/../**/*.entity.{js,ts}`],
    migrations:[__dirname + `/../../migrations/*{.ts, .js}`],
    synchronize:false,
    migrationsRun:true,
    logging:false,
    namingStrategy:new SnakeNamingStrategy(),  
}
export const AppDs =  new DataSource(datasourceconfig)