import { Body, Controller, Get, HttpCode, HttpStatus, Post, Render, Request, Response, UseGuards } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { JwtAuthGuard } from '../guard/auth.guard';
import { LocalAuthGuard } from '../guard/local.guard';
import { SocketService } from 'src/socket/socket.service';
import { SocketGateway } from 'src/socket/socket.gateway';

@Controller('auth')
export class AuthController {

    constructor(private authService: AuthService,
                private socket:SocketGateway){}

    @HttpCode(HttpStatus.OK)
    @Post("login")
    singIn(@Body() singInDTO: Record<string,any>){
        return this.authService.signIn(singInDTO.usuario,singInDTO.contraseña)
    }
    
    @UseGuards(JwtAuthGuard)
    @Get("perfil")
    getPerfil(@Request() req){
        return req.usuario
    }
    
    //api/auth/sesion
    @Get("sesion")
    @Render("index")
    getSesion(){}

    @Post("sesion")
    async postsesion(@Request() req, @Response() res){
        const { userT, passT} = req.body;

        const validaruser = await this.authService.validateUser(userT, passT)

        if(validaruser){
            req.session.authenticated = true;
            req.session.user = userT;
            return res.redirect("menu")
        }
        return res.status(HttpStatus.UNAUTHORIZED).render
        ('index', { error: 'Credenciales inválidas' });

    }
    
    @UseGuards(LocalAuthGuard)
    @Get("menu")
    @Render("menu")
    getmenu(@Request()req):{usuario:string}{
        const usuario = req.session.user    
        this.socket.setUsuario(usuario)    
        return {usuario}
    }
}
