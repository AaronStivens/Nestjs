import { Body, Controller, Get, Param, Post, Put, Delete } from '@nestjs/common';
import { UsersService } from '../services/users.service';
import { UpdateuserDTO, UserDTO, UserToProjectDTO } from '../DTO/user.DTO';

@Controller('users')
export class UsersController {

    constructor(private UserService: UsersService){}

    @Post("registrar") //Crear usuario
    public async registerUser(@Body() body: UserDTO){
        return await this.UserService.createUser(body)
    }

    @Post("registrar-proyecto")//Pendiente uso
    public async addToPoject(@Body() body: UserToProjectDTO){
        return await this.UserService.relationToProject(body)
    }

    @Get("todos") //Mostrar todos los usuarios
    public async findAllUsers(){
        return await this.UserService.findUsers()
    }
     
    @Get(":id") //Buscar un usuario por ID
    public async finUser(@Param("id") id:string){
        return await this.UserService.findByID(id)
    }
     
    @Put("actualizar/:id")//Actualizar usuario
    public async updateuser(@Param("id") id:string, @Body() body:UpdateuserDTO){
        return await this.UserService.Updateuser(body,id)

    }

    @Delete(":id")
    public async deletebyID(@Param("id") id:string){
        return await this.UserService.deleteuser(id)

    }

}
