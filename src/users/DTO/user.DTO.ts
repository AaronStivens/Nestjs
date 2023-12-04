import { IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString, IsUUID } from "class-validator";
import { ACCESS_LEVEL, ROLES } from "src/constants/roles";
import { UsersEntity } from "../entity/users.entity";
import { Projectentity } from "src/projects/entity/projects.entity";


//Los DTOS son como estructuras que se deben cumplir al momento de trabajar con lso decoradores en este caso POST al momento de ingresar datos a la base
export class UserDTO{
    
    @IsOptional()
    @IsNumber()
    id?:number;

    @IsNotEmpty()
    @IsString()
    nombre:string;

    @IsNotEmpty()
    @IsString()
    apellido: string;

    @IsNotEmpty()
    @IsNumber()
    edad: number

    @IsNotEmpty()
    @IsString()
    email: string;

    @IsNotEmpty()
    @IsString()
    usuario: string;

    @IsNotEmpty()
    @IsString()
    contraseña: string;

    @IsNotEmpty()
    @IsEnum(ROLES)
    rol: ROLES;
}

export class UpdateuserDTO{

    @IsOptional()
    @IsString()
    nombre:string;

    @IsOptional()
    @IsString()
    apellido: string;

    @IsOptional()
    @IsNumber()
    edad: number

    @IsOptional()
    @IsString()
    email: string;

    @IsOptional()
    @IsString()
    usuario: string;

    @IsOptional()
    @IsString()
    contraseña: string;

    @IsOptional()
    @IsEnum(ROLES)
    rol: ROLES; 
}

export class UserToProjectDTO{

    @IsNotEmpty()
    @IsNumber()
    usuario:UsersEntity

    @IsNotEmpty()
    @IsUUID()
    project:Projectentity

    @IsNotEmpty()
    @IsEnum(ACCESS_LEVEL)
    accessLevel:ACCESS_LEVEL
}

