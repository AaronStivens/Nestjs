import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersEntity } from '../entity/users.entity';
import {Repository, UpdateResult, DeleteResult} from "typeorm";
import { UpdateuserDTO, UserDTO, UserToProjectDTO } from '../DTO/user.DTO';
import { errormanager } from 'utils/error.manager';
import * as bcrypt from 'bcrypt';
import { UsersProjecEntity } from '../entity/usersproject.entity';

@Injectable()
export class UsersService {

    constructor(@InjectRepository(UsersEntity) private readonly userRepository: Repository<UsersEntity>,
                @InjectRepository(UsersProjecEntity) private readonly userprojectRepository: Repository<UsersProjecEntity>,)
                {process.env.HASH_SALT}
    
    //Creacion de usuario
    public async createUser(Body:UserDTO):Promise<UsersEntity>{
        try {            
            Body.contraseña = await bcrypt.hash(Body.contraseña, +process.env.HASH_SALT);            
            return await this.userRepository.save(Body);
        } catch (error) {
            throw new Error (error)
        }
    }
    
    //Mostrar todos los usuarios
    public async findUsers():Promise<UsersEntity[]>{
       try {
        const user:UsersEntity[] = await this.userRepository.find();
        if(user.length === 0){
            throw new errormanager({
                type:"BAD_REQUEST",
                 message: "No se encontraron resultados"
                })
        }
        return user
       } catch (error) {
        throw new errormanager.createSignatureError(error.message)
       }
    }
    //Buscar un usuario
    public async findByID(id:string):Promise<UsersEntity>{
        try {
            const user:UsersEntity = await this.userRepository.createQueryBuilder("user").where({id}).getOne();
            if(!user){
                throw new errormanager({type:"BAD_GATEWAY",
                message: "Usuario no encontrado"
            })            
            }
            return user
        } catch (error) {
            throw errormanager.createSignatureError(error.message)
        }
    }
     //Actualizar un usuario
    public async Updateuser(body:UpdateuserDTO, id:string):Promise<UpdateResult | undefined>{
        try {
            const user: UpdateResult =  await this.userRepository.update(id,body)
            if(user.affected === 0){
                throw new errormanager({type:"BAD_REQUEST",
                message:"Error al actualizar el usuario"
            })
    }
                return user
        } catch (error) {
               throw  errormanager.createSignatureError(error.message)}
    }
    //Eliminar un usuario
    public async deleteuser(id:string):Promise<DeleteResult | undefined>{
        try {
            const user:DeleteResult =  await this.userRepository.delete(id);
            if(user.affected === 0){
                return undefined
            }
                return user
        } catch (error) {
            
        }

    }

    public async relationToProject(body:UserToProjectDTO){
        try {
            return await this.userprojectRepository.save(body)
        } catch (error) {
            throw errormanager.createSignatureError(error.message)
            
        }
    }
     
    
    public async findBy({key,value}:{
        key:keyof UserDTO;
        value:any ;
    }){
        try {
            const usuario:UsersEntity = await this.userRepository.createQueryBuilder("usuario",).addSelect("usuario.constraseña").where({[key]:value}).getOne();
        } catch (error) {
            
        }
    }

    async findOne(usuario: string): Promise<UsersEntity | undefined> {
        const user = await this.userRepository.findOne({ where: { usuario: usuario } });
        return user;
    }



}
