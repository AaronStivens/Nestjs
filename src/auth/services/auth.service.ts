import { Injectable, ParseFloatPipe, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/services/users.service';
import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';

@Injectable()
export class AuthService {
    constructor(
        private usersService:UsersService,
        private jwtservice:JwtService,){}

    async signIn(usuario, pass){
        const user = await this.usersService.findOne(usuario);
        if(user?.contraseña != pass){
            throw new UnauthorizedException();
        }

        const payload = {sub: user.id, usuario: user.usuario}
        return { acces_token: await this.jwtservice.signAsync(payload)}

    }

    async validateUser(usuario: string, password: string): Promise<boolean> {
        
        const user = await this.usersService.findOne(usuario);
    
        
        if (user && user.contraseña === password) {
         console.log("Usuario correcto")
          return true
        }
        console.log("Usuario incorrecto")
        return false;
        
       
      }
    }

   