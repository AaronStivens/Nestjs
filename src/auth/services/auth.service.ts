import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/services/users.service';
import { JwtService } from '@nestjs/jwt';
import * as colors from "colors";

@Injectable()
export class AuthService {
    constructor(
        private usersService:UsersService,
        private jwtservice:JwtService,){}

    //Funcion para comparar usuario y contraseña de api    
    async signIn(usuario, pass){
        const user = await this.usersService.findOne(usuario);
        if(user?.contraseña != pass){
            throw new UnauthorizedException();
        }
    //Si es verdadera se genera el token de acceso
        const payload = {sub: user.id, usuario: user.usuario}
        return { acces_token: await this.jwtservice.signAsync(payload)}
    }
    //Funciona para el login de motor de vista hbs
    async validateUser(usuario:string, pass): Promise<boolean> {
        const user = await this.usersService.findOne(usuario)

        if(user && user.contraseña === pass){
            console.log(colors.green("Usuario correcto"))
            return true;
        }else{
            console.log(colors.red("Usuario incorrecto"))
            return false;
        }
       
        }
    }

   