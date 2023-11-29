import { CorsOptions } from "@nestjs/common/interfaces/external/cors-options.interface";

export const cors:CorsOptions={
origin:true,
methods:`GET,HEAD,PUT,PATCH,POST,DELETE,OPTION`,
credentials:true
}