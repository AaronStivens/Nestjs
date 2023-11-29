import { Body, Controller, Get, HttpCode, HttpStatus, Post, Render, Request, Response, UseGuards } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { AuthGuard } from '../guard/auth.guard';

@Controller('auth')
export class AuthController {

    constructor(private authService: AuthService,){}

    @HttpCode(HttpStatus.OK)
    @Post("login")
    singIn(@Body() singInDTO: Record<string,any>){
        return this.authService.signIn(singInDTO.usuario,singInDTO.contraseña)
    }
    
    @UseGuards(AuthGuard)
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
            return res.redirect("/perfil")
        }
        return res.status(HttpStatus.UNAUTHORIZED).render('index', { error: 'Credenciales inválidas' });

    }

    
}
