import { ROLES } from "../../constants/roles";
import { IUser } from "../../interfaces/user.interface";
import {BaseEntity,Column, Entity, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import { UsersProjecEntity } from "./usersproject.entity";
import { Exclude } from "class-transformer";

//Las entidades representan la estructua de la base de datos
@Entity({name:"users"})
export class UsersEntity extends BaseEntity implements IUser {

    @PrimaryGeneratedColumn()
    id:any;
     
    @Column()
    nombre:string;

    @Column()
    apellido: string;

    @Column()
    edad: number;

    @Column({unique:true})
    email: string;

    @Column({unique:true})
    usuario: string;

    @Exclude()
    @Column()
    contraseña: string;
    
    @Column({type:`enum`, enum:ROLES})
    rol: ROLES;

    @OneToMany(()=> UsersEntity,(usersproject)=>usersproject.usuario)//Pendiente su uso
    projectsInclude:UsersProjecEntity[]
}