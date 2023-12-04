import { Module } from '@nestjs/common';
import { AuthController } from './controller/auth.controller';
import { AuthService } from './services/auth.service';
import { UsersService } from 'src/users/services/users.service';
import { UsersModule } from 'src/users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constans/constantes';
import { SocketService } from 'src/socket/socket.service';
import { SocketGateway } from 'src/socket/socket.gateway';

@Module({
  imports: [UsersModule,JwtModule.register({
    global:true,
    secret: jwtConstants.secret,
    signOptions: {expiresIn: "1h"}
  })],
  
  controllers: [AuthController],
  providers: [AuthService,UsersService, SocketService, SocketGateway]
})
export class AuthModule {}
