import { CorsOptions } from "@nestjs/common/interfaces/external/cors-options.interface";

export const cors:CorsOptions={
origin:true, //Permitir origines de cualquier fuente
methods:`GET,HEAD,PUT,PATCH,POST,DELETE,OPTION`,//Metodos permitidos para las solicitudes cors
credentials:true //Solicitar credenciales
}