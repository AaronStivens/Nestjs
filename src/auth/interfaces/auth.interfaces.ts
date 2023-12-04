import { ROLES } from "src/constants/roles";

export interface payloadToken{
sub:string;
rol:ROLES;
}

export interface AuthBody{
    usuario:string;
    contraseña:string;
}

//Pendiente su uso